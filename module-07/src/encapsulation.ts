// OOP: Encapsulation

class BankAccount {
  public readonly userId: number;
  protected userName: string;
  private userBalance: number;
  constructor(userId: number, userName: string, userBalance: number) {
    this.userId = userId;
    this.userName = userName;
    this.userBalance = userBalance;
  }

  private addBalance(balance: number) {
    this.userBalance += balance;
  }

  callEncapsulatedMethod(balance: number) {
    return this.addBalance(balance);
  }
}

const accountOfShuvo = new BankAccount(123, "Shuvo Saha", 100);
accountOfShuvo.callEncapsulatedMethod(50);
console.log(accountOfShuvo);
