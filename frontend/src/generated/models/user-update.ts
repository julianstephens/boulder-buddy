/* tslint:disable */
/* eslint-disable */
/**
 * Boulder Buddy
 * Boulder Buddy API
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface UserUpdate
 */
export interface UserUpdate {
    /**
     * 
     * @type {string}
     * @memberof UserUpdate
     */
    'password'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserUpdate
     */
    'email'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserUpdate
     */
    'is_active'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UserUpdate
     */
    'is_superuser'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UserUpdate
     */
    'is_verified'?: boolean;
}

