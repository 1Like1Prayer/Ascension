/**
 * Every user-facing string in the app. No display copy lives outside this folder.
 *
 * One file per screen, plus `shared.ts` for copy that two or more screens read.
 * A string starts in its screen's file and only moves to `shared.ts` once a
 * second screen needs it — that keeps `shared.ts` from silently becoming the
 * place every string ends up.
 *
 * Values are frozen literal types, so a mistyped key fails to compile rather
 * than rendering a blank label.
 */
export { shared, type SharedCopy } from './shared';
export { login, type LoginCopy } from './login';
