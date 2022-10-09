export class UserInfo {
  constructor({ userName, userAbout, avatar }) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._avatar = avatar;
  }

  getUserInfo() {
    this.info = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    };
    return this.info;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    this._avatar.setAttribute("src", data.avatar);
  }
}
