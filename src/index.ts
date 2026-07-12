import "../css/style.css";

interface WeeklySummary {
	day: string;
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

async function fetchData(data: string) {
	const response = await fetch(`./${data}.json`);
	const json = await response.json();
	return json;
}

function isWeeklySummary(value: unknown): value is WeeklySummary[] {
	if (!Array.isArray(value)) return false;

	return value.every((item) => {
		if (typeof item !== "object" || item === null) return false;
		if (!("day" in item) || !("amount" in item)) return false;
		return typeof item.day === "string" && typeof item.amount === "number";
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
	return `${(value / highest) * 85}%`;
}

function calcDiff(currMonth: number, lastMonth: number): string {
	const calc = currMonth / lastMonth;
	if (calc > 1) return `+${((calc - 1) * 100).toFixed(2)}%`;
	else if (calc < 1) return `-${((1 - calc) * 100).toFixed(2)}%`;
	else return "0.00%";
}

const weeklySummary = await fetchData("weeklySummary");
const myBalance = await fetchData("myBalance");
const monthlySummary = await fetchData("monthlySummary");
const date = new Date();
const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const today = weekdays[date.getDay()];

if (isWeeklySummary(weeklySummary)) {
	const highestAmount = [...weeklySummary].sort(
		(a, b) => b.amount - a.amount,
	)[0].amount;

	const columns = document.querySelectorAll(".graphic__column");

	columns.forEach((column, index) => {
		const { day, amount } = weeklySummary[index];
		if (column instanceof HTMLElement) {
			column.style.height = calcColumnHeight(highestAmount, amount);
			column.dataset.amount = `$${amount.toFixed(2)}`;

			if (day === today) {
				const todaysColumn = column.querySelector(
					".graphic__column--amount",
				);
				todaysColumn?.classList.add("active");
			}
		}
	});
}

if (isBalance(myBalance)) {
	const balanceEl = document.querySelector(".card-header__balance");
	if (balanceEl instanceof HTMLParagraphElement)
		balanceEl.innerText = `$${myBalance.balance.toFixed(2)}`;
}

if (isMonthlySummary(monthlySummary)) {
	const { currentMonth, previousMonth } = monthlySummary;

	const currentMonthEl = document.querySelector(".current-month__expenses");
	if (currentMonthEl instanceof HTMLParagraphElement)
		currentMonthEl.innerText = `$${currentMonth.total.toFixed(2)}`;

	const lastMonthDiff = document.querySelector(".last-month__expenses");
	if (lastMonthDiff instanceof HTMLParagraphElement)
		lastMonthDiff.innerText = `${calcDiff(currentMonth.total, previousMonth.total)}`;
}
