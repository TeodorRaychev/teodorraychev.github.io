import { ValidatorFn } from '@angular/forms';

export function appEmailValidator(domains: string[]): ValidatorFn {
  // /^[^@]{6,}@gmail\.(com|bg)$/

  const domainString = domains.join('|');
  const re = new RegExp('^([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.[a-z0-9]{1,}|([0-9]{1,3}\.{3}[0-9]{1,3}))$')
  return (control) => {
    return (control.value === '' || re.test(control.value))
      ? null
      : { appEmailValidator: true };
  };
}
