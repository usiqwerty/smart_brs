class BRS {
    name: string;
    subratings: BRS[];
    weight: number;
    self_maxval: number;
    self_value: number;

    constructor(name: string, maxval = 100, self_value = 0, weight = 1, subs: BRS[] = []) {
        this.name = name;
        this.subratings = subs;
        this.weight = weight;
        this.self_maxval = maxval;
        this.self_value = self_value;
    }

    value() {

        if (this.subratings.length > 0) {
            let sum = 0;
            this.subratings.forEach((subrating) => {
                sum += subrating.value() * subrating.weight;
            });
            return sum;
        } else {
            return this.self_value;
        }
    }

    maxvalue() {
        if (this.subratings.length > 0) {
            let sum = 0;
            this.subratings.forEach((subrating) => {
                sum += subrating.maxvalue() * subrating.weight;
            });
            return sum;
        } else {
            return this.self_maxval;
        }
    }

    rest() {
        return this.maxvalue() - this.value();
        //TODO: add blocked()
    }
}
export class Task{
    name: string;
    score: number;
    constructor(name: string, score: number) {
        this.name=name;
        this.score=score;
    }
}
export function rsolve(rating: BRS, increase_target: number): Task[] {
    //console.log(rating);
    let sum_rest = rating.rest();
    if (rating.subratings.length == 0) {
        const score = Math.min(sum_rest, increase_target);
        return [new Task(rating.name, score)];
    }

    let tasks: Task[] = [];
    for (const sub_rating of rating.subratings as BRS[]) {
        tasks = tasks.concat(rsolve(sub_rating, increase_target * (sub_rating.rest() / sum_rest)));
    }

    return tasks;

}

export default BRS;