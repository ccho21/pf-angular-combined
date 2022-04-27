import { MatDialogConfig } from '@angular/material/dialog';

export function defaultDialogConfig() {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '500px';

  return dialogConfig;
}

export function largeDialogConfig() {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '100%';

  return dialogConfig;
}
