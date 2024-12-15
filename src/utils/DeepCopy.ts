
import _ from 'lodash';

export function deepCopy<T>(object: T): T {
    return _.cloneDeep(object);
}