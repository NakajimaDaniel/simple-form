
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

import { dbConection, createUser, nameValidation, emailValidation, cpfValidation, phoneValidation } from '../scripts'


require("fake-indexeddb/auto");



let dom
let container

describe('register user', () => {

  const html = fs.readFileSync(path.resolve(__dirname,"../index.html"), 'utf8');

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    container = dom.window.document.body
  })

  it('show message if not validated', () => {

    document.body.innerHTML = `
      <form id="user-form">
        <input id="name-input" value="tt" />
        <span id="name-span" style="visibility: hidden"><span/>
        <input type="email" id="email-input" value="test" />
        <span id="email-span" style="visibility: hidden"></span>
        <input id="cpf-input"  value="test" pattern="([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"/>
        <span id="cpf-span" style="visibility: hidden"></span>
        <input id="number-input" value="test" pattern="^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$"/>
        <span id="number-span" style="visibility: hidden"></span>
        <button id="submit-button" type="submit"></button>
      </form>
    `;

    const nameSpan = document.getElementById("name-span");
    const emailSpan = document.getElementById("email-span");
    const cpfSpan = document.getElementById("cpf-span");
    const numberSpan = document.getElementById("number-span");

    nameValidation();
    emailValidation();
    cpfValidation();
    phoneValidation();

    expect(nameSpan).toBeVisible();
    expect(emailSpan).toBeVisible();
    expect(cpfSpan).toBeVisible();
    expect(numberSpan).toBeVisible();
  })

  it('create user if validated', async() => {

    Date.now = jest.fn(() => 1487076708000)

    document.body.innerHTML = `
    <form id="user-form">
      <input id="name-input" value="test" />
      <span id="name-span" style="visibility: hidden"><span/>
      <input type="email" id="email-input" value="test@test" />
      <span id="email-span" style="visibility: hidden"></span>
      <input id="cpf-input"  value="222.222.222-22" pattern="([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"/>
      <span id="cpf-span" style="visibility: hidden"></span>
      <input id="number-input" value="11 1111 1111" pattern="^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$"/>
      <span id="number-span" style="visibility: hidden"></span>
      <button id="submit-button" type="submit"></button>
    </form>
    `;

    const userData = await createUser();

    await expect(userData).toEqual({
      "id": 1487076708000,
      "name": "test",
      "email": "test@test",
      "cpf": "222.222.222-22",
      "phoneNumber": "11 1111 1111"
    })

  })



})