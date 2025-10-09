/*
Создайте ОДИН смоук тест со следующими шагами:

1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
2. Заполните форму регистрации
3. Проверьте, что пользователь успешно зарегистрирован

*/

import test, {expect} from "@playwright/test";


interface ICredentials{
    firstname: string,
    lastname: string,
    address: string,
    email: string,
    phone: string,
    country: Array<string>,
    gender: Array<string>,
    hobbies: Array<string>,
    language: string,
    skills: Array<string>
    yearOfBirth: string,
    monthOfBirth: string,
    dayOfBirth: string,
    password: string,
}

enum NOTIFICATIONS {
    REGISTER_DETAIL = "Registration Details",
}

test.describe("[Registration Form]", async ()=> {
    const validCred: ICredentials = {
        firstname: "Борис",
        lastname: "Бритва",
        address: "ул. Чехова, д. 12, Санкт-Петербург",
        email: "b.razer@gmail.com",
        phone: "+8 800 555 35 35",
        country: ["USA", "Canada", "UK"],
        gender: ["male", "female"],
        hobbies: ["Travelling", "Movies", "Sports", "Gaming", "Dancing"],
        language: "English, Русский",
        skills: ["JavaScript", "Python", "Java", "C++", "Ruby"],
        yearOfBirth: "1980",
        monthOfBirth: "August",
        dayOfBirth: "10",
        password: "Qwerty12345",
    }

    test.beforeEach(async ({page}) => {
        const url = 'https://anatoly-karpovich.github.io/demo-registration-form/'
        await page.goto(url);
    })

    test("success registration", async ({page}) => {
        const firstNameInput = page.locator('#firstName');
        const lastNameInput = page.locator('#lastName');
        const addressInput = page.locator('#address')
        const emailInput = page.locator('#email')
        const phoneInput = page.locator('#phone')
        const countrySelect = page.locator('#country')
        const genderRadio = (value:string) => page.locator(`//input[@name='gender'][@value='${value}']`)
        const hobbiesCheckbox = (val: string) => page.locator(`//input[@class='hobby' and @value='${val}']`);
        const languageInput = page.locator('#language')
        const skillsLocator =  page.locator('#skills')
        const yearOfBirthSelect = page.locator("#year")
        const monthOfBirthSelect = page.locator("#month")
        const dayOfBirthSelect = page.locator("#day")
        const passwordInput = page.locator('#password')
        const passwordConfirmInput = page.locator('#password-confirm')
        const registerButton = page.locator("//button[@type='submit']");
        const notificationTitle = page.locator("//h2[@class='text-center']")

        await firstNameInput.fill(validCred.firstname);
        await lastNameInput.fill(validCred.lastname);
        await addressInput.fill(validCred.address);
        await emailInput.fill(validCred.email);
        await phoneInput.fill(validCred.phone);
        await countrySelect.selectOption(validCred.country[0]!);
        await genderRadio(validCred.gender[0]!).check();

        const Hobbies= [validCred.hobbies[0]!, validCred.hobbies[1]!, validCred.hobbies[2]!];
        for (const checkbox of Hobbies) {
                await hobbiesCheckbox(checkbox).check()};

        await languageInput.fill(validCred.language);
        const skills = [validCred.skills[0]!, validCred.skills[1]!];
        await skillsLocator.selectOption(skills);
        await yearOfBirthSelect.selectOption(validCred.yearOfBirth);
        await monthOfBirthSelect.selectOption(validCred.monthOfBirth);
        await dayOfBirthSelect.selectOption(validCred.dayOfBirth);
        await passwordInput.fill(validCred.password)
        await passwordConfirmInput.fill(validCred.password)
        await registerButton.click();
        await expect(notificationTitle).toBeVisible();
        await expect(notificationTitle).toHaveText(NOTIFICATIONS.REGISTER_DETAIL)
    })
})
