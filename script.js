document.addEventListener("DOMContentLoaded", function() {
    const emriInput = document.getElementById("emri");
    const mbiemriInput = document.getElementById("mbiemri");
    const shtetiInput = document.getElementById("shteti");
    const gjiniaInputs = document.getElementsByName("gjinia");
    const ratingInput = document.getElementById("rating");
    const voteBtn = document.getElementById("vote-btn");
    const votatList = document.getElementById("votat");
    const mesatarjaSpan = document.getElementById("mesatarja");
    const numriTotalSpan = document.getElementById("numri-total");

    voteBtn.addEventListener("click", function() {
        
        let valid = true;
        const emri = emriInput.value.trim();
        const mbiemri = mbiemriInput.value.trim();
        const shteti = shtetiInput.value.trim();
        let gjinia = "";
        for (const gjiniaInput of gjiniaInputs) {
            if (gjiniaInput.checked) {
                gjinia = gjiniaInput.value;
                break;
            }
        }
        const rating = parseFloat(ratingInput.value);

        if (emri === "") {
            valid = false;
            emriInput.classList.add("red-text");
        } else {
            emriInput.classList.remove("red-text");
        }

        if (mbiemri === "") {
            valid = false;
            mbiemriInput.classList.add("red-text");
        } else {
            mbiemriInput.classList.remove("red-text");
        }

        if (shteti === "") {
            valid = false;
            shtetiInput.classList.add("red-text");
        } else {
            shtetiInput.classList.remove("red-text");
        }

        const genderIcon = document.createElement("img");
        genderIcon.classList.add("gender-icon");
       
        if (gjinia === "mashkull") {
            genderIcon.src = "male.svg"; 
            genderIcon.alt = "Mashkull";
        } else if (gjinia === "femer") {
            genderIcon.src = "female.svg"; 
            genderIcon.alt = "Femër";
        }

        if (isNaN((rating)) || rating < 1 || rating > 10) {
            valid = false;
            ratingInput.classList.add("red-text");
        } else {
            ratingInput.classList.remove("red-text");
        }

        if (!valid) {
            return;
        }

        const li = document.createElement("li");
        li.textContent = `${emri} ${mbiemri}, ${shteti}, rating: ${rating}/10`;
        li.appendChild(genderIcon);
        votatList.appendChild(li);
        
        const votat = votatList.children;
        let totalRating = 0;
        for (const vota of votat) {
            const ratingText = vota.textContent.split(":")[1].trim().split("/")[0];
            totalRating += parseFloat(ratingText);
        }
        const mesatarja = (totalRating / votat.length).toFixed(1);
        mesatarjaSpan.textContent = mesatarja;

        numriTotalSpan.textContent = votat.length;

        emriInput.value = "";
        mbiemriInput.value = "";
        shtetiInput.value = "";
        for (const gjiniaInput of gjiniaInputs) {
            gjiniaInput.checked = false;
        }
        ratingInput.value = "";
    });
});
