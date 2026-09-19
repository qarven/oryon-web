export function convertProtoTimeToDate(seconds: bigint, nanos: number) {
  return new Date(Number(seconds) * 1000 + Math.floor(nanos / 1_000_000));
}
