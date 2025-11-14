// Access Modify

class BankAccount {
  public readonly userId: number;
  protected userName: string;
  private userBalance: number;
  constructor(userId: number, userName: string, userBalance: number) {
    this.userId = userId;
    this.userName = userName;
    this.userBalance = userBalance;
  }

  addBalance(balance: number) {
    this.userBalance += balance;
  }
}

const accountOfShuvo = new BankAccount(123, "Shuvo Saha", 100);
accountOfShuvo.addBalance(50);
console.log(accountOfShuvo);
