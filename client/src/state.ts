import { Context } from './context';

export abstract class State {
    public name: string
    context: Context

    constructor(args: {
        name: string,
        context: Context
    }) {
        this.name = args.name
        this.context = args.context
    }

    abstract initialize(): void
    abstract step(): void
}
  
