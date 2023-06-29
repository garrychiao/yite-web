export default function validatorPromise(condition) {
  return !!condition ? Promise.resolve() : Promise.reject();
}
