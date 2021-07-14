import * as btoa from 'btoa';

export const USER = 'tales';
export const PASS = 'tales';
export const basic = btoa(`${USER}:${PASS}`);