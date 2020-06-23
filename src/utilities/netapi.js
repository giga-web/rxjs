import qs from 'qs';

export function formatParams(format, params, query) {
  if (query) {
    return qs.stringify(params, { addQueryPrefix: true });
  }

  return params;
}
