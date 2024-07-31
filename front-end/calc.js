function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (!height || !weight) {
        alert('Please fill out all fields');
        return;
    }

    const bmi = weight / ((height / 100) ** 2);
    let interpretation = '';

    if (bmi < 18.5) {
        interpretation = 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        interpretation = 'Normal weight';
    } else if (bmi >= 25 && bmi <= 29.9) {
        interpretation = 'Overweight';
    } else {
        interpretation = 'Obesity';
    }

    document.getElementById('result').innerHTML = `
        <p>Your BMI is ${bmi.toFixed(2)}</p>
        <p>Category&nbsp;: ${interpretation}</p>
    `;
}
