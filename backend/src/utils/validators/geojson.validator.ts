import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

type Position = [number, number];
type LinearRing = Position[];

interface Point {
  type: 'Point';
  coordinates: Position;
}

interface LineString {
  type: 'LineString';
  coordinates: Position[];
}

interface Polygon {
  type: 'Polygon';
  coordinates: LinearRing[];
}

type GeoJSONObject = Point | LineString | Polygon;

@ValidatorConstraint({ name: 'isGeoJSON', async: false })
export class IsGeoJSONConstraint implements ValidatorConstraintInterface {
  validate(geometry: unknown, _args: ValidationArguments): boolean {
    if (!geometry || typeof geometry !== 'object') {
      return false;
    }

    const geo = geometry as GeoJSONObject;

    if (!geo.type || !geo.coordinates) {
      return false;
    }

    const isPosition = (pos: unknown): pos is Position =>
      Array.isArray(pos) &&
      pos.length === 2 &&
      typeof pos[0] === 'number' &&
      typeof pos[1] === 'number';

    switch (geo.type) {
      case 'Point':
        return isPosition(geo.coordinates);

      case 'LineString':
        if (geo.coordinates.length < 2) return false;
        return geo.coordinates.every(isPosition);

      case 'Polygon':
        if (geo.coordinates.length === 0) return false;

        for (const ring of geo.coordinates) {
          if (ring.length < 4) return false;
          if (
            JSON.stringify(ring[0]) !== JSON.stringify(ring[ring.length - 1])
          ) {
            return false;
          }
          if (!ring.every(isPosition)) return false;
        }
        return true;

      default:
        return false;
    }
  }

  defaultMessage(_args: ValidationArguments) {
    return 'O campo $property deve ser um objeto GeoJSON válido (Point, LineString ou Polygon) com a estrutura de coordenadas correta.';
  }
}

export function IsGeoJSON(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsGeoJSONConstraint,
    });
  };
}
