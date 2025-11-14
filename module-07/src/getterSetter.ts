// getter
// setter

class BankAccount {
  public readonly userId: number;
  protected userName: string;
  private userBalance: number;
  constructor(userId: number, userName: string, userBalance: number) {
    this.userId = userId;
    this.userName = userName;
    this.userBalance = userBalance;
  }

  // set balance using function
  addBalance(balance: number) {
    this.userBalance += balance;
  }

  // using set keyword
  set plusBalance(amount: number) {
    this.userBalance += amount;
  }

  // get balance using function
  getBalance() {
    return this.userBalance;
  }

  // using get keyword
  get findBalance() {
    return this.userBalance;
  }
}

const accountOfShuvo = new BankAccount(123, "Shuvo Saha", 100);
accountOfShuvo.addBalance(50);
console.log(accountOfShuvo, accountOfShuvo.getBalance());

accountOfShuvo.plusBalance = 20;
console.log(accountOfShuvo.findBalance);
