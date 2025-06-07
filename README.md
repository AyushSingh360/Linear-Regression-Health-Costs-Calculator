
# 🧠 Linear Regression Health Costs Calculator

Welcome to the **Health Costs Calculator**, a machine learning project that uses **Linear Regression** to predict individual medical insurance costs based on personal data like age, BMI, smoking status, and more.

<p align="center">
  <img src="https://img.shields.io/badge/Machine%20Learning-Linear%20Regression-blue" />
  <img src="https://img.shields.io/badge/Notebook-Jupyter-orange" />
  <img src="https://img.shields.io/badge/Language-Python3-yellow" />
</p>

---

## 🎯 Features

- Load and explore the **Medical Cost Personal Datasets**
- Perform **exploratory data analysis** (EDA)
- Visualize relationships with **correlation heatmaps** and **pair plots**
- Encode categorical variables (like `sex`, `smoker`, `region`)
- Train a **Linear Regression** model using `scikit-learn`
- Evaluate model using **Mean Absolute Error**
- Predict health insurance charges for new inputs

---

## 🛠️ Installation & Setup

> Ensure you have Python 3.x and Jupyter Notebook installed.

```bash
# Clone the repository (optional)
git clone https://github.com/your-username/Linear-Regression-Health-Costs-Calculator.git

# Navigate to the project directory
cd Linear-Regression-Health-Costs-Calculator

# Install the required libraries
pip install pandas matplotlib seaborn scikit-learn jupyter
```

Then open the notebook:

```bash
jupyter notebook Health_Costs_Calculator.ipynb
```

---

## 📈 Model Inputs

The model considers the following features:

- `age`: Age of the individual
- `sex`: Gender (`male` or `female`)
- `bmi`: Body Mass Index
- `children`: Number of children
- `smoker`: Smoking status (`yes` or `no`)
- `region`: Geographic region

---

## 💡 Example Prediction

```python
input_data = pd.DataFrame({
    "age": [35],
    "sex": ["male"],
    "bmi": [26.5],
    "children": [2],
    "smoker": ["no"],
    "region": ["northeast"]
})

predicted_cost = model.predict(input_data)
print(f"Predicted Health Cost: ${predicted_cost[0]:.2f}")
```

---

## 🧾 License

This project is open-source and free to use under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Ayush Singh**  
Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/ayushsingh360/) or check out more projects on my [GitHub](https://github.com/AyushSingh360).
