import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactions = this.all();
    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, obj) => total + obj.value, 0);
    const outcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((total, obj) => total + obj.value, 0);
    const totalBalance = income - outcome;

    const balance = {
      income,
      outcome,
      total: totalBalance,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
