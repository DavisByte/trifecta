// Ensure only the stat card is visible on page load
window.onload = function() {
    showCard('trifecta-card');  // Show the stat card
};

function showCard(cardId) {
    // Hide all cards
    const allCards = document.querySelectorAll('.calculator-content');
    allCards.forEach(card => {
        card.style.display = 'none';
    });

    // Show the selected card
    const card = document.getElementById(cardId);
    if (cardId === 'trifecta-card') {
        card.style.display = 'block'; // Make sure the Trifecta card is visible
    } else {
        card.style.display = 'block';
    }
}


function calculateTime() {
    const currentWeight = parseFloat(document.getElementById('CWeight').value);
    const targetWeight = parseFloat(document.getElementById('TWeight').value);

    if (currentWeight && targetWeight) {
        // Calculate the number of weeks to reach the target weight
        let weeksToGoal = (Math.abs(currentWeight - targetWeight)) / 0.5;

        // Calculate the date to reach the goal
        const goalDate = new Date();
        goalDate.setDate(goalDate.getDate() + weeksToGoal * 7); // Add the number of weeks to the current date

        // Display the result
        if (currentWeight > targetWeight) {
            document.getElementById('time-result').innerText =
                `For stable weight loss, you should aim to lose 0.5 kg per week. \n You will reach your target weight in ${weeksToGoal.toFixed(1)} weeks, \n on ${goalDate.toDateString()}.`;
        } else if (currentWeight < targetWeight) {
            document.getElementById('time-result').innerText =
                `For stable weight gain, you should aim to gain 0.5 kg per week. \n You will reach your target weight in ${weeksToGoal.toFixed(1)} weeks, \n on ${goalDate.toDateString()}.`;
        } else {
            document.getElementById('time-result').innerText =
                `You are already at your target weight!`;
        }
    } else {
        document.getElementById('time-result').innerText =
            `Please enter valid numbers for your current weight and target weight.`;
    }
}

function switchCalculator(calculatorType) {
    const bmiCard = document.getElementById("bmi-card");
    const caloriesCard = document.getElementById("calories-card");

    if (calculatorType === "bmi") {
        bmiCard.classList.add("show");
        caloriesCard.classList.remove("show");
    } else {
        bmiCard.classList.remove("show");
        caloriesCard.classList.add("show");
    }
}

function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to meters
    const weight = parseFloat(document.getElementById('weight').value);

    if (height > 0 && weight > 0) {
        const bmi = (weight / (height * height)).toFixed(2);

        // Determine the BMI classification
        let classification = '';
        if (bmi < 18.5) {
            classification = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            classification = 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            classification = 'Overweight';
        } else if (bmi >= 30 && bmi < 34.9) {
            classification = 'Obese Class I (Moderate)';
        } else if (bmi >= 35 && bmi < 39.9) {
            classification = 'Obese Class II (Severe)';
        } else {
            classification = 'Obese Class III (Very Severe or Morbidly Obese)';
        }

        // Display the result with classification
        document.getElementById('bmi-result').innerText = `Your BMI is ${bmi} - Classification: ${classification}`;
    } else {
        document.getElementById('bmi-result').innerText = "Please enter valid height and weight values.";
    }
}


function calculateMaintenanceCalories() {
    const height = parseFloat(document.getElementById('calories-height').value);
    const weight = parseFloat(document.getElementById('calories-weight').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activityLevel = parseFloat(document.getElementById('activity').value);

    if (height > 0 && weight > 0 && age > 0) {
        let bmr;

        // Calculate BMR based on gender
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        // Multiply BMR by activity level to get maintenance calories
        const maintenanceCalories = (bmr * activityLevel).toFixed(2);
        document.getElementById('calorie-result').innerText = `Your maintenance calories are approximately ${maintenanceCalories} kcal per day.`;
    } else {
        document.getElementById('calorie-result').innerText = "Please enter valid values for height, weight, and age.";
    }
}

function generateMealPlan() {
    const maintenanceCalories = parseFloat(document.getElementById('MCalories').value);

    // Check if the maintenance calories field is empty or invalid
    if (isNaN(maintenanceCalories) || maintenanceCalories <= 0) {
        document.getElementById('meal-result').innerText =
            "Please enter a valid value for maintenance calories.";
        return;
    }

    // Define meal plans based on calorie intake ranges
    const mealPlans = {
        "0-1000": {
            Breakfast: [
                "Day 1: Small apple and a boiled egg",
                "Day 2: Light oatmeal with water",
                "Day 3: Half a banana and Greek yogurt",
                "Day 4: A slice of whole-grain toast",
                "Day 5: A boiled egg with spinach",
                "Day 6: Smoothie with almond milk",
                "Day 7: Low-fat granola bar"
            ],
            Lunch: [
                "Day 1: Small portion of chicken soup",
                "Day 2: Light salad with olive oil",
                "Day 3: Grilled zucchini with rice",
                "Day 4: Veggie wrap with hummus",
                "Day 5: Steamed veggies with tofu",
                "Day 6: Broth-based soup",
                "Day 7: Small chicken salad"
            ],
            Dinner: [
                "Day 1: Grilled fish with green beans",
                "Day 2: Stir-fried tofu and broccoli",
                "Day 3: Small baked sweet potato",
                "Day 4: Grilled chicken with a side salad",
                "Day 5: Veggie stir-fry",
                "Day 6: Roasted turkey slices",
                "Day 7: Mixed vegetable soup"
            ],
        },
        "1000-1500": {
            Breakfast: [
                "Day 1: Oatmeal with berries",
                "Day 2: Scrambled eggs with spinach",
                "Day 3: Greek yogurt with a drizzle of honey",
                "Day 4: Smoothie with banana and almond milk",
                "Day 5: Chia pudding with strawberries",
                "Day 6: Whole wheat toast with avocado",
                "Day 7: Scrambled egg whites with mushrooms"
            ],
            Lunch: [
                "Day 1: Grilled chicken salad with mixed greens",
                "Day 2: Veggie wrap with hummus",
                "Day 3: Turkey sandwich on whole-grain bread",
                "Day 4: Tuna salad with cucumbers and tomatoes",
                "Day 5: Quinoa bowl with roasted veggies",
                "Day 6: Grilled shrimp with a side of green beans",
                "Day 7: Chicken and avocado salad"
            ],
            Dinner: [
                "Day 1: Baked salmon with steamed broccoli",
                "Day 2: Grilled chicken with quinoa",
                "Day 3: Vegetable stir-fry with tofu",
                "Day 4: Grilled turkey breast with roasted vegetables",
                "Day 5: Baked cod with asparagus",
                "Day 6: Spaghetti squash with marinara sauce",
                "Day 7: Grilled fish with sautéed spinach"
            ],
        },
        "1500-2000": {
            Breakfast: [
                "Day 1: Smoothie with banana, spinach, and protein powder",
                "Day 2: Oatmeal with almonds and berries",
                "Day 3: Scrambled eggs with avocado",
                "Day 4: Greek yogurt with honey and chia seeds",
                "Day 5: Whole grain toast with peanut butter",
                "Day 6: Breakfast burrito with scrambled eggs",
                "Day 7: Chia seed pudding with coconut milk"
            ],
            Lunch: [
                "Day 1: Quinoa bowl with roasted veggies and chickpeas",
                "Day 2: Grilled chicken with sweet potatoes",
                "Day 3: Tuna salad with mixed greens",
                "Day 4: Veggie wrap with hummus and lettuce",
                "Day 5: Chicken Caesar salad",
                "Day 6: Grilled turkey burger with a side of veggies",
                "Day 7: Shrimp stir-fry with vegetables"
            ],
            Dinner: [
                "Day 1: Baked cod with steamed broccoli and quinoa",
                "Day 2: Grilled turkey burger with avocado and a side salad",
                "Day 3: Chicken stir-fry with brown rice",
                "Day 4: Grilled salmon with roasted Brussels sprouts",
                "Day 5: Beef stir-fry with peppers and zucchini",
                "Day 6: Shrimp and vegetable stir-fry with rice",
                "Day 7: Grilled chicken with roasted sweet potatoes"
            ],
        },
        "2000-2500": {
            Breakfast: [
                "Day 1: Whole-grain pancakes with maple syrup",
                "Day 2: Greek yogurt with granola and berries",
                "Day 3: Egg white omelet with spinach and mushrooms",
                "Day 4: Oatmeal with peanut butter and banana",
                "Day 5: Smoothie with kale, avocado, and protein powder",
                "Day 6: Scrambled eggs with tomatoes and onions",
                "Day 7: Chia pudding with coconut flakes"
            ],
            Lunch: [
                "Day 1: Chicken wrap with avocado and lettuce",
                "Day 2: Grilled shrimp salad with mixed greens",
                "Day 3: Quinoa bowl with roasted vegetables",
                "Day 4: Grilled chicken with quinoa and green beans",
                "Day 5: Turkey sandwich with spinach and hummus",
                "Day 6: Veggie and cheese quesadilla",
                "Day 7: Grilled chicken Caesar salad"
            ],
            Dinner: [
                "Day 1: Baked salmon with sweet potatoes and green beans",
                "Day 2: Grilled chicken with roasted Brussels sprouts",
                "Day 3: Beef stir-fry with broccoli and bell peppers",
                "Day 4: Grilled shrimp with roasted vegetables",
                "Day 5: Chicken stir-fry with mixed veggies",
                "Day 6: Grilled pork with roasted sweet potatoes",
                "Day 7: Grilled chicken with a quinoa salad"
            ],
        },
        "2500-3000": {
            Breakfast: [
                "Day 1: Whole-grain waffles with mixed berries",
                "Day 2: Oatmeal with honey, almonds, and strawberries",
                "Day 3: Scrambled eggs with feta cheese and spinach",
                "Day 4: Smoothie with mango, spinach, and protein powder",
                "Day 5: Greek yogurt with honey and granola",
                "Day 6: Whole wheat toast with almond butter and banana",
                "Day 7: Chia pudding with almond milk"
            ],
            Lunch: [
                "Day 1: Chicken and avocado salad with mixed greens",
                "Day 2: Grilled shrimp with quinoa and roasted vegetables",
                "Day 3: Turkey club sandwich with a side salad",
                "Day 4: Quinoa bowl with grilled chicken and chickpeas",
                "Day 5: Tuna wrap with cucumber and spinach",
                "Day 6: Veggie and cheese wrap with hummus",
                "Day 7: Grilled chicken with a vegetable stir-fry"
            ],
            Dinner: [
                "Day 1: Baked salmon with roasted Brussels sprouts and quinoa",
                "Day 2: Grilled chicken with sweet potatoes and steamed broccoli",
                "Day 3: Beef stir-fry with zucchini and bell peppers",
                "Day 4: Grilled pork chops with a side of roasted vegetables",
                "Day 5: Grilled shrimp with roasted cauliflower",
                "Day 6: Chicken stir-fry with brown rice",
                "Day 7: Grilled turkey with a spinach and quinoa salad"
            ],
        },
    };

    // Determine which range the maintenanceCalories falls into
    let selectedMealPlan = null;
    for (const range in mealPlans) {
        const [min, max] = range.split('-').map(Number);
        if (maintenanceCalories > min && maintenanceCalories <= max) {
            selectedMealPlan = mealPlans[range];
            break;
        }
    }

    if (!selectedMealPlan) {
        document.getElementById('meal-result').innerText =
            "No meal plan available for this calorie range.";
        return;
    }

    // Output the meal plan to the user
    let mealPlanHtml = '';

    Object.keys(selectedMealPlan).forEach(mealType => {
        mealPlanHtml += `<div class="meal-plan"><h3>${mealType}</h3><ul>`;
        selectedMealPlan[mealType].forEach(dayMeal => {
            mealPlanHtml += `<li>${dayMeal}</li>`;
        });
        mealPlanHtml += `</ul></div>`;
    });

    // Display the meal plan
    document.getElementById('meal-result').innerHTML = mealPlanHtml;
}



function generateRegiment() {
    const type = document.getElementById('PType').value;
    const workouts = {
        gain: {
            "Day 1: Chest & Triceps": [
                "Bench Press – 4 sets of 8–10 reps",
                "Incline Dumbbell Press – 4 sets of 10 reps",
                "Chest Flyes – 3 sets of 12 reps",
                "Tricep Dips – 3 sets of 10 reps",
                "Overhead Tricep Extension – 3 sets of 12 reps"
            ],
            "Day 2: Back & Biceps": [
                "Pull-Ups – 4 sets of 8–10 reps",
                "Barbell Bicep Curls – 3 sets of 10 reps",
                "Seated Cable Row – 3 sets of 12 reps",
                "Bent-Over Barbell Rows – 4 sets of 10 reps",
                "Hammer Curls – 3 sets of 12 reps"
            ],
            "Day 3: Back & Biceps":[
                "Squats – 4 sets of 8–10 reps",
                "Leg Press – 4 sets of 12 reps",
                "Romanian Deadlifts – 3 sets of 10 reps",
                "Leg Extensions – 3 sets of 12 reps",
                "Calf Raises – 4 sets of 15 reps"
            ],
            "Day 4: Shoulders & Abs":[
                "Overhead Shoulder Press – 4 sets of 8–10 reps",
                "Lateral Raises – 3 sets of 12 reps",
                "Front Raises – 3 sets of 12 reps",
                "Reverse Flyes – 3 sets of 12 reps",
                "Weighted Russian Twists – 3 sets of 15 reps per side"
            ],
            "Day 5: Full-Body Compound Movements":[
                "Deadlifts – 4 sets of 8 reps",
                "Weighted Lunges – 3 sets of 10 reps per leg",
                "Incline Dumbbell Press – 3 sets of 12 reps",
                "Pull-Ups (Weighted if Possible) – 3 sets of 8 reps",
                "Bicycle Crunches – 3 sets of 20 reps per side"
            ]
        },
        lose: {
            "Day 1: Full Body HIIT Circuit": [
                "Burpees – 4 sets of 15 reps",
                "Mountain Climbers – 4 sets of 40 seconds",
                "Jump Squats – 3 sets of 15 reps",
                "Push-Ups – 3 sets of 20 reps",
                "High Knees – 4 sets of 40 seconds"
            ],
            "Day 2: Lower Body & Cardio": [
                "Walking Lunges – 4 sets of 12 reps per leg",
                "Squat Jumps – 4 sets of 15 reps",
                "Step-Ups – 3 sets of 12 reps per leg",
                "Kettlebell Swings – 3 sets of 20 reps",
                "Plank Hold – 3 sets, hold for 45 seconds"
            ],
            "Day 3: Upper Body Strength & Cardio":[
                 "Push-Ups – 4 sets of 15 reps",
                 "Dumbbell Shoulder Press – 4 sets of 12 reps",
                 "Lat Pulldown – 3 sets of 15 reps",
                 "Bicep Curls – 3 sets of 12 reps",
                 "Battle Ropes – 4 sets of 30 seconds"
            ],
            "Day 4: Core & Cardio Blast":[
                "Bicycle Crunches – 4 sets of 20 reps per side",
                "Russian Twists – 3 sets of 20 reps per side",
                "Flutter Kicks – 3 sets of 40 reps",
                "Sprinting (Treadmill or Outdoors) – 6 sets of 30-second sprints with 30 seconds rest",
                "Leg Raises – 3 sets of 15 reps"
            ],
            "Day 5: Full-Body Circuit":[
                "Dumbbell Thrusters – 4 sets of 15 reps",
                "Kettlebell Swings – 4 sets of 20 reps",
                "Jumping Jacks – 3 sets of 1 minute",
                "Reverse Lunges – 3 sets of 15 reps per leg",
                "High Plank to Low Plank – 3 sets of 45 seconds"
            ]
        }
    };

    const regimen = workouts[type];
    const resultContainer = document.getElementById('regiment-result');

    // Clear previous content
    resultContainer.innerHTML = "";

    for (const [day, exercises] of Object.entries(regimen)) {
        // Create a container for each day
        const dayContainer = document.createElement('div');
        dayContainer.classList.add('exercise-day');

        // Add the day title
        const dayTitle = document.createElement('h3');
        dayTitle.innerText = day;
        dayContainer.appendChild(dayTitle);

        // Add the exercises as a list
        const exerciseList = document.createElement('ul');
        exercises.forEach(exercise => {
            const listItem = document.createElement('li');
            listItem.innerText = exercise;
            exerciseList.appendChild(listItem);
        });
        dayContainer.appendChild(exerciseList);

        // Append to the result container
        resultContainer.appendChild(dayContainer);
    }
}
