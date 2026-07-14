import "../css/style.css";

interface WeeklySummary {
	day: Weekday;
	amount: number;
}

interface Balance {
	balance: number;
	currency: string;
	lastUpdated: string;
}

interface Month {
	month: string;
	total: number;
}
interface MonthlySummary {
	currentMonth: Month;
	previousMonth: Month;
}

const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
type Weekday = (typeof weekdays)[number];
const weekdaysFull: Record<Weekday, string> = {
	mon: "Monday",
	tue: "Tuesday",
	wed: "Wednesday",
	thu: "Thursday",
	fri: "Friday",
	sat: "Saturday",
	sun: "Sunday",
};

async function fetchData<T>(
	data: string,
	validator: (value: unknown) => value is T,
): Promise<T | null> {
	try {
		const response = await fetch(`./${data}.json`);
		const json = await response.json();
		if (validator(json)) return json;
		console.error(`Invalid data format for "${data}"`, json);
		return null;
	} catch (err) {
		console.error(err);
		return null;
	}
}

function isDay(value: unknown): value is Weekday {
	return typeof value === "string" && weekdays.includes(value as Weekday);
}

function isWeeklySummary(value: unknown): value is WeeklySummary[] {
	if (!Array.isArray(value)) return false;

	return value.every((item) => {
		if (typeof item !== "object" || item === null) return false;
		if (!("day" in item) || !("amount" in item)) return false;
		return isDay(item.day) && typeof item.amount === "number";
	});
}

function isBalance(value: unknown): value is Balance {
	if (typeof value !== "object" || value === null) return false;
	if (
		!("balance" in value) ||
		!("currency" in value) ||
		!("lastUpdated" in value)
	)
		return false;
	return (
		typeof value.balance === "number" &&
		typeof value.currency === "string" &&
		typeof value.lastUpdated === "string"
	);
}

function isMonth(value: unknown): value is Month {
	if (typeof value !== "object" || value === null) return false;
	if (!("month" in value) || !("total" in value)) return false;
	return typeof value.month === "string" && typeof value.total === "number";
}

function isMonthlySummary(value: unknown): value is MonthlySummary {
	if (typeof value !== "object" || value === null) return false;
	if (!("currentMonth" in value) || !("previousMonth" in value)) return false;
	return isMonth(value.currentMonth) && isMonth(value.previousMonth);
}

function calcColumnHeight(highest: number, value: number): string {
	return `${(value / highest) * 65}%`;
}

function calcDiff(currMonth: number, lastMonth: number): string {
	const calc = currMonth / lastMonth - 1;
	if (calc > 0) return `+${(calc * 100).toFixed(2)}%`;
	else return `${(calc * 100).toFixed(2)}%`;
}

const [weeklySummary, myBalance, monthlySummary] = await Promise.all([
	fetchData("weeklySummary", isWeeklySummary),
	fetchData("balance", isBalance),
	fetchData("monthlySummary", isMonthlySummary),
]);
const date = new Date();
const today = weekdays[date.getDay()];

if (weeklySummary !== null) {
	const highestAmount = Math.max(...weeklySummary.map((item) => item.amount));
	const wrapper = document.querySelector(".card-content__chart");
	const fragment = document.createDocumentFragment();
	const template = document.createElement("template");
	template.innerHTML = `<li class="chart__column">
	<p class="chart__day" aria-hidden="true"></p>
	<span class="chart__amount" aria-hidden="true"></span>
	<span class="sr-only"></span>
</li>`;
	if (wrapper instanceof HTMLElement) {
		weeklySummary.forEach((daySummary) => {
			const { day, amount } = daySummary;
			const clone = template.content.cloneNode(true) as DocumentFragment;
			const column = clone.querySelector(".chart__amount");
			const columnDay = clone.querySelector(".chart__day");
			const srOnly = clone.querySelector(".sr-only");
			if (
				column instanceof HTMLElement &&
				columnDay instanceof HTMLElement &&
				srOnly instanceof HTMLElement
			) {
				columnDay.innerText = day;
				srOnly.innerText = `${weekdaysFull[day]}: $${amount.toFixed(2)}`;
				column.style.height = calcColumnHeight(highestAmount, amount);
				column.dataset.amount = `$${amount.toFixed(2)}`;

				if (day === today)
					column.classList.add("chart__amount--active");
			}
			fragment.appendChild(clone);
		});
		wrapper.innerHTML = "";
		wrapper.appendChild(fragment);
	}
}

if (myBalance !== null) {
	const balanceEl = document.querySelector(".card-header__balance");
	if (balanceEl instanceof HTMLElement)
		balanceEl.innerText = `$${myBalance.balance.toFixed(2)}`;
}

if (monthlySummary !== null) {
	const { currentMonth, previousMonth } = monthlySummary;

	const currentMonthEl = document.querySelector(
		".summary__current-month-value",
	);
	if (currentMonthEl instanceof HTMLElement)
		currentMonthEl.innerText = `$${currentMonth.total.toFixed(2)}`;

	const lastMonthDiff = document.querySelector(".summary__last-month-value");
	if (lastMonthDiff instanceof HTMLElement)
		lastMonthDiff.innerText = `${calcDiff(currentMonth.total, previousMonth.total)}`;
}
