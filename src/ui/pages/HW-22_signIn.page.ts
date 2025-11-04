import { SalesPortalPage } from "./salesPortal.page";
import { ICredentials } from "data/types/credentials.types";

export class SignInPage extends SalesPortalPage {
  readonly loginForm = this.page.locator("//form");
  readonly pageTitle = this.page.getByText("Sign in with");
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator("button[type='submit']");
  readonly uniqueElement = this.emailInput;

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async fillCredentials(credentials: ICredentials) {
    await this.emailInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
  }
}
