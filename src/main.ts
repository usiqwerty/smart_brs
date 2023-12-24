import BRS from './brs_solver';
import {rsolve} from './brs_solver';
import {Task} from "./brs_solver";

function superspan() {
    let counter=0;
    let subject_brs_list: BRS[] = [];
    let ratings = document.querySelectorAll(".js-service-rating-link")
    for (const rating_link of ratings as any) {

        //rating_link = rating_link as HTMLElement;
        (rating_link as HTMLElement).click();
        setTimeout(() => {
            let id = rating_link.id;
            let subject = document.querySelector("#info-" + id);
            let class_types: any = subject?.querySelectorAll(".brs-countainer") || [];
            let class_types_brs = [];
            for (const class_type of class_types) {
                let attestations = class_type.querySelectorAll(".brs-slide-pane-cont")

                let biba: HTMLElement = class_type.querySelector(".brs-h4") as HTMLElement;
                let kuk: HTMLElement = biba.querySelector(".brs-gray") as HTMLElement;
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

                            let resultable=document.createElement("span");
                            resultable.id = "task" + counter;
                            task_tag.appendChild(resultable);
                            let max_value = Number(task_tag.innerText.split("из ")[1]);
                            tasks_brs.push(new BRS("task"+counter, max_value, user_value));
                            counter++;
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
    return subject_brs_list;
}
function show_results(tasks: Task[]){
    for (const task of tasks){
        let span = document.getElementById(task.name);
        if (span) {
            span.innerText = "(Нужно набрать ещё " + task.score+")";
        }
    }
}
let subject_brs_list = superspan();
setTimeout(() => {
    //console.log(subject_brs_list);
    for (const subj of subject_brs_list) {
        //console.log('mogus', subj);
        const increase_target = 80 -  subj.value();
        if (increase_target>0) {
            const solution = rsolve(subj, increase_target);
            console.log(solution);
            show_results(solution);
        }
    }

    console.log('end');
}, 2000);
