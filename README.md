## 💭 Abstract
This project involves the development of a Travel Tracker application that allows travelers to manage and track their trips while also providing functionality for a travel agency. The primary objectives include implementing data manipulation using object and array prototype methods, creating an accessible user interface, making network requests to retrieve and add data, and ensuring code quality through a robust testing suite following the Test-Driven Development (TDD) approach. The project's timeline specifies a submission deadline at the end of Week 6 giving us a 8 day timeframe.

The application leverages technologies such as the Fetch API for data retrieval and Mocha and Chai for testing. It utilizes the provided endpoints for fetching traveler, trip, and destination information, as well as adding new trips and destinations. The project is structured into iterations, including the development of a dashboard displaying trips and their costs, allowing travelers to make trip requests, ensuring accessibility and compliance with colorblind users, and implementing a user login system.

Testing is a crucial aspect of this project, with an emphasis on testing pure functions and covering various test cases. Additionally, accessibility is a key focus, with the aim of achieving a near-perfect score on the Lighthouse Accessibility Audit. This Travel Tracker application offers a comprehensive solution for travelers and travel agencies to efficiently manage and track trips, promoting a seamless and user-friendly travel planning experience.

## 💻 Installation instructions
1. Clone the project from my github.
2. Clone down the API from this link: https://github.com/turingschool-examples/travel-tracker-api.
3. Open terminal and run `git clone` followed by the links you get from both clone links on Github.
4. Navigate to the file directory where travel tracker was cloned into and run npm install.
5. Run npm start on the travel tracker. 
6. Copy the link that it gives you that should look something like `http://localhost:8080/`.
7. It should display the project but not be able to do anything. This is normal.
8. Run npm install on the API directory.
9. Run npm start in the API directory.
10. Navigate back to the 8080 link and you should see that the project is working upon logging in! 

## 📷 Preview of App
![sample video of the project](https://github.com/Jesuitman/m2-travel-tracker/blob/main/Travel%20Tracker%20gif.gif)
## 🍎 Context
The first two days I worked on the project it took me a while because I was approaching it in a way that wasnt conducive to my working style. I worked from scratch and this time when I worked I built out hardcoded variables that enabled me to build functions out piece by piece. I hit a major stopping point with a bug but was able to overcome it with the help of a Teacher. Overall, I spent close to 30 hours on the project.

## 🧠 Contributors
Lex

## 🖇️ Learning Goals
### Proficiency in Object and Array Manipulation: 
Gain expertise in using object and array prototype methods for effective data manipulation within the application.

### Front-End Development Skills: 
Develop a clear and accessible user interface, incorporating semantic HTML and ARIA tags where appropriate to enhance usability.

### Network Requests and API Integration: 
Learn how to make network requests to retrieve and post data, utilizing the Fetch API for seamless data management.

### Test-Driven Development (TDD): 
Master the practice of TDD by building a robust testing suite using Mocha and Chai to ensure code quality and functionality.

### Single Responsibility Principle (SRP): 
Apply SRP in code design by writing clean, DRY (Don't Repeat Yourself), and reusable code for improved maintainability.

### Project Management and Collaboration: 
Experience collaborating on a software project through Pull Request (PR) submissions, code reviews, and accountability partnerships.

### User Authentication and Authorization: 
Implement a user login system, allowing users to access their dashboard with the provided credentials.

### Accessibility Best Practices: 
Develop a strong understanding of web accessibility, ensuring that the application can be used without a mouse, is colorblind-friendly, and achieves a high Lighthouse Accessibility Audit score for an inclusive user experience.

## 🎆 Wins && 🔥 Challenges#
### Wins:
My biggest win was when I got the login screen working. Connecting that to the fetch requests was extremely difficult because I had to use string interpolation in a way I was not used to. Another big win I had was when I got rid of my test variables to connect it to the API which was a massively refreshing feeling

### Challenges: 
I experienced a bug where I couldnt get the new data to populate into the trips when I submitted a new trip. I was really struggling with that and it took me several days. I reached out to several members of my cohort and couldnt get anywhere with it. I finally was able to get it working with the help of a teacher.

## 📝 Observations && ❓ Questions
I had to completely change all of my mindset when it came to working with API because I hit several bumps that made me rethink how I was importing variables

## Instructions for the User Test
1. Follow readme instructions to get the project up and running
2. Use travel10 as a username, travel as a password. 
3. You will see various trips pop up! Scroll through and see what trips are pending, costs of trips, and all past trips. 
4. Schedule a trip. Add as many travelers as you want! Add as many days as you would like!
5. Select any destination from the dropdown menu 
6. When you click submit, you should see your new trip in the pending trips section as well as the cost field updated to show you how much you'll be spending.


## Results from the User Test:
- User noticed typo in readme, fixed
- Change cost of trips to be in year instead of just cost of trips, fixed
- Adjust header for title name, fixed
- Add bottom border for past and cost boxes, fixed
- Add rounding for costs to only the first two digits after the ., fixed
- Remove the bullet point from each trip, fixed
- User shouldn’t be able to schedule trips in the past, fixed
- User hates comic sans, fixed