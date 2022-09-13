export class UserInfo {
  constructor({userName, userAbout}) {
  this._userName = userName
  this._userAbout = userAbout
  }

  getUserInfo(){
    this.info = {name: this._userName.textContent, about: this._userAbout.textContent}
    return this.info
  }

  setUserInfo(name, about){
    this._userName.textContent = name
    this._userAbout.textContent = about
  }
}
