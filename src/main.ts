class BRS {
    name: string;
    subratings: BRS[];
    weight: number;
    self_maxval: number;
    self_value: number;
    constructor(name, maxval = 100, self_value = 0, weight = 1,  subs = []) {
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
    maxvalue(){
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

let subject_brs_list=[];
let ratings = document.querySelectorAll(".js-service-rating-link")
ratings.forEach((rating_link: HTMLElement)=>{
    rating_link.click();
    setTimeout(()=>{
        let id = rating_link.id;
        let subject = document.querySelector("#info-"+id);
        let class_types = subject.querySelectorAll(".brs-countainer");

        let class_types_brs = [];
        class_types.forEach((class_type)=>{
            let attestations = class_type.querySelectorAll(".brs-slide-pane-cont")

            let kuk: HTMLElement =class_type.querySelector(".brs-h4").querySelector(".brs-gray");
            let class_quotient = Number(kuk.innerText);

            let attestation_brs=[];
            attestations.forEach((attestation)=>{
                let brs_values=attestation.querySelector(".brs-values");

                let buk:HTMLElement =attestation.querySelector(".brs-gray");
                let quotient = Number(buk.innerText);

                let tasks_brs=[];
                if (brs_values)
                {
                    let tasks = brs_values.querySelectorAll("p");
                    tasks.forEach((task_tag) => {
                        let user_value = Number(task_tag.querySelector("strong").innerText);
                        let name = task_tag.innerText.split("—")[0].trim();

                        let max_value = Number(task_tag.innerText.split("из ")[1]);
                        tasks_brs.push(new BRS(name, max_value, user_value));
                    });
                }
                attestation_brs.push(new BRS('name', 100, 0, quotient, tasks_brs)); //it should be calculate-able at this point
            });
            class_types_brs.push(new BRS("asid", 100, 0, class_quotient, attestation_brs));
        });

        let the_subj=new BRS("subject"+id, 100, 0, 1, class_types_brs)
        subject_brs_list.push(the_subj);
        let score_tag = rating_link.querySelectorAll(".js-service-rating-td")[1];
        let subject_sum=the_subj.value();
        score_tag.innerHTML="(по факту "+Number(subject_sum.toFixed(3))+")";
        rating_link.click();

    }, 1000);
});
console.log(subject_brs_list);