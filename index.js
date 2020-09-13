(() => {
    function setupLayout() {
        const container = document.getElementById("countdown-elements-container");
        const containerWidth = window.innerWidth * 0.8;
        container.style.width = `${containerWidth}px`;
        const timeBox = Array.prototype.slice.call(document.getElementsByClassName("box"));
        const boxSize = containerWidth / 4 * 0.7;
        const blocks = Array.prototype.slice.call(document.getElementsByClassName("block"));
        blocks.forEach(block => {
            block.style.lineHeight = `${boxSize}px`;
            block.style.fontSize = `${boxSize * 0.4}px`;
        });
        timeBox.forEach(box => {
            box.style.width = `${boxSize}px`;
            box.style.height = `${boxSize}px`;
            box.style.lineHeight = `${boxSize}px`;
            box.style.fontSize = `${boxSize * 0.4}px`;
        });
        return { timeBox };
    }
    function dateCalculator(targetDate) {
        // second in each unit
        const secondInAday = 24 * 60 * 60;
        const secondInAnHour = secondInAday / 24;
        const secondInAMinute = secondInAnHour / 60;
        // get today
        const today = new Date();
        // get upcoming new years day 
        const target = new Date(targetDate);
        target.setHours(0);
        target.setMinutes(0);
        target.setSeconds(0);
        // get different second between these two day
        let differSecondBetweenTwoDate = (+target - +today) / 1000;

        let day = Math.floor(differSecondBetweenTwoDate/ secondInAday);
        let hour = Math.floor((differSecondBetweenTwoDate - (day * secondInAday)) / secondInAnHour);
        let minute = Math.floor((differSecondBetweenTwoDate - (day * secondInAday) - (hour * secondInAnHour)) / secondInAMinute);
        let second = Math.floor(differSecondBetweenTwoDate - (day * secondInAday) - (hour * secondInAnHour) - (minute * secondInAMinute));
        return { day, hour, minute, second };
    }
    function setInnerText(elem, value) {
        if (value < 10) {
            elem.innerHTML = '0' + value;
            return;
        }
        elem.innerHTML = value;
    }
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function formatDate(date) {
        let d = new Date(date), 
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        } 
        if (day.length < 2) {
            day = '0' + day;
        }
        return [ year, month, day ].join('-');
    }
    function App() {
        // random body backgroud-color
        document.body.style.backgroundColor = `rgba(${random(0,255)}, ${random(0,255)}, ${random(0,255)}, 0.3)`;
        document.addEventListener('click', () => {
            // random body backgroud-color
            document.body.style.backgroundColor = `rgba(${random(0,255)}, ${random(0,255)}, ${random(0,255)}, 0.3)`;
        });
        const { timeBox } = setupLayout(); 
        // responsive layout
        window.addEventListener('resize', setupLayout);
        // get date from input
        const targetDate = document.getElementById("target-date");
        // set minimum value
        const tomorrow = formatDate(new Date().setDate(new Date().getDate() + 1));
        targetDate.setAttribute("min", tomorrow);
        // set value variable
        targetDate.value = "2021-01-01";
        let selectedDate = "2021-01-01";
        // change value and then random background color
        targetDate.addEventListener('change', function() {
            // random body backgroud-color
            document.body.style.backgroundColor = `rgba(${random(0,255)}, ${random(0,255)}, ${random(0,255)}, 0.3)`;
            selectedDate = this.value;
            document.getElementsByClassName("info")[0].innerHTML = `Countdown to ${selectedDate}`;
        });

        const countdown = setInterval(() => {
            const { day, hour, minute, second } = dateCalculator(selectedDate);
            timeBox[3].style.transform = `scale(1)`;
            setInnerText(timeBox[0], day);
            setInnerText(timeBox[1], hour);
            setInnerText(timeBox[2], minute);
            setInnerText(timeBox[3], second);
            if (day == 0 && hour == 0 && minute == 0) {
                timeBox[3].style.transform = `scale(2)`;
                if (second == 0) {
                    console.log("happy new year");
                }
            }
        }, 1000);
    }
    App();
})();