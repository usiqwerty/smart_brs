import BRS from './brs_solver';

let subject_brs_list: BRS[] = [];
let ratings= document.querySelectorAll(".js-service-rating-link")
for (const rating_link of ratings) {

    //rating_link = rating_link as HTMLElement;
    (rating_link as HTMLElement).click();
    setTimeout(() => {
        let id = rating_link.id;
        let subject = document.querySelector("#info-" + id);
        let class_types = subject?.querySelectorAll(".brs-countainer") || [];
        let class_types_brs = [];
        for (const class_type of class_types) {
            let attestations = class_type.querySelectorAll(".brs-slide-pane-cont")

            let biba:HTMLElement = class_type.querySelector(".brs-h4") as  HTMLElement;
            let kuk:HTMLElement = biba.querySelector(".brs-gray") as HTMLElement;
            let class_quotient = Number(kuk.innerText);

            let attestation_brs = [];
            for (const attestation of attestations) {
                let brs_values = attestation.querySelector(".brs-values");

                let buk: HTMLElement = attestation.querySelector(".brs-gray") as HTMLElement;
                let quotient = Number(buk.innerText);

                let tasks_brs = [];
                if (brs_values) {
                    let tasks = brs_values.querySelectorAll("p");
                    for (const task_tag of tasks) {
                        let thenum = task_tag.querySelector("strong") as HTMLElement;
                        let user_value = Number(thenum.innerText);
                        let name = task_tag.innerText.split("—")[0].trim();

                        let max_value = Number(task_tag.innerText.split("из ")[1]);
                        tasks_brs.push(new BRS(name, max_value, user_value));
                    }
                }
                attestation_brs.push(new BRS('name', 100, 0, quotient, tasks_brs)); //it should be calculate-able at this point
            }
            class_types_brs.push(new BRS("asid", 100, 0, class_quotient, attestation_brs));
        }

        let the_subj = new BRS("subject" + id, 100, 0, 1, class_types_brs)
        subject_brs_list.push(the_subj);
        let score_tag = rating_link.querySelectorAll(".js-service-rating-td")[1];
        let subject_sum = the_subj.value();
        score_tag.innerHTML = "(по факту " + Number(subject_sum.toFixed(3)) + ")";
        (rating_link as HTMLElement).click();

    }, 1000);
}
console.log(subject_brs_list);