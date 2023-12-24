class BRS {
    name: string;
    subratings: BRS[];
    weight: number;
    self_maxval: number;
    self_value: number;

    constructor(name: string, maxval = 100, self_value = 0, weight = 1, subs:BRS[] = []) {
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
}
export default BRS;