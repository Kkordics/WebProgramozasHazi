class Pet {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.hunger = 5;  // Éhség (1-10)
        this.happiness = 5;  // Boldogság (1-10)

        this.petDiv = document.createElement("div");
        this.petDiv.innerHTML = `
            <h2>${this.name} a ${this.type}</h2>
            <p class="status">Éhség: <span id="${this.name}-hunger">${this.hunger}</span> | Boldogság: <span id="${this.name}-happiness">${this.happiness}</span></p>
            <button id="${this.name}-feed">🍖 Etetés</button>
            <button id="${this.name}-play">🎾 Játék</button>
        `;
        document.querySelector(".pet-container").appendChild(this.petDiv);

        document.getElementById(`${this.name}-feed`).addEventListener("click", () => this.feed());
        document.getElementById(`${this.name}-play`).addEventListener("click", () => this.play());

        this.updateMood();
    }

    feed() {
        this.hunger = Math.max(0, this.hunger - 1);
        this.updateStatus();
    }

    play() {
        this.happiness = Math.min(10, this.happiness + 1);
        this.hunger = Math.min(10, this.hunger + 1);  // Játék után éhesebb lesz
        this.updateStatus();
    }

    updateStatus() {
        document.getElementById(`${this.name}-hunger`).textContent = this.hunger;
        document.getElementById(`${this.name}-happiness`).textContent = this.happiness;
        this.updateMood();
    }

    updateMood() {
        if (this.hunger >= 8) {
            this.petDiv.style.color = "red";  // Nagyon éhes
        } else if (this.happiness <= 3) {
            this.petDiv.style.color = "blue"; // Szomorú
        } else {
            this.petDiv.style.color = "black"; // Normál állapot
        }
    }
}

class SpecialPet extends Pet {
    constructor(name, type, specialAbility) {
        super(name, type);
        this.specialAbility = specialAbility;
    }

    play() {
        super.play();
        console.log(`${this.name} ${this.specialAbility}-et csinált! 🎉`);
    }
}

// Létrehozunk két kisállatot
new Pet("Cirmi", "macska");
new SpecialPet("Buksi", "kutya", "pörgést");
