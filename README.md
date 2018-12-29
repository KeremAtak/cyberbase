# cyberbase

Mooc cybersecuritybase course project 1

The following application is a very simple discussion forum where users who have logged in can add messages to it. The application has security flaws that have been fixed in comments. The application uses React.js + Node.js + Express.js + MongoDB -stack.

Installation instructions:

1. Clone to following repository: https://github.com/KeremAtak/cyberbase.git. If you’re unfamiliar with git and github read the following guide: http://rogerdudler.github.io/git-guide/
2.Make sure you have Node installed (https://nodejs.org/en/download/package-manager/), preferably with the latest one, v.11.0.0.
3. Run install_node_modules.sh-script located in the root of the project.
4. Paste the following content to the .env file located at /backend: (censored on Github)
5. Go to /frontend and type in npm start on terminal. Go to /backend and type in (on a separate terminal) npm run watch. The frontend is now running at http://localhost:3000/ and backend in http://localhost:3001/.
6. Great, your installation should be up and running! Please, do not break the database or do any truly malicious things..

Pages:
Index - user can view messages, or add messages to the page once logged in.
Login/register – login/register your user account
admin – tools for admin, allows him to delete pages.

Flaws, please fix these in order: 
Broken authentication (Owasp #2)
Injection (#1)
Broken access control (#5)
Insufficient logging & monitoring (#10)
Sensitive data exposure (#3)

Flaw #1: Broken authentication

This application stores your credentials in plain text. Once you create an account and log in with it you should be able to see the credentials in the terminal that the logger views. This is obviously awful implementation because any attacker that sees your credentials will be able to use your account.

We will fix this flaw with JSON Web Token. JWT will be used to hash the passwords before sending them to the database. If the attacker gets access to your password hash he will be unable to use it directly as bcrypt dependency will hash the provided password in the login form and compare it with the hash acquired from the database.

Uncomment lines 22-25  in /controllers/users (backend), and line 30, too. Clear line 31. Registration will now create hashed passwords. The form will also now demand a strong password: my method asks for passwords that are at least 10 characters long, contains small and big characters, and also numbers. Uncomment line 11 from /controllers/login, and remove the one below. Uncomment the token comments in lines 24 and 26. This will make the controller compare hashed passwords, and will return a token in response. In /controllers/messages uncomment the lines 26-37, and delete line 38. This will make the controller utilize the token for authentication instead of plain user id. 

Flaw #2: Injection

This program is vulnerable to denial of service attacks via injection. The developer of this program wanted to implement a secret feature where math operations are calculated before sending them as a message. Try typing in 2+3 for example; you’ll get 5.

The eval()-function will also run code, which is very dangerous when it accepts input. You can crash the backend by logging in with your account (create a new one if you created one before fixing the first flaw) and typing in ”process.kill(process.pid)” for example.

You can fix the flaw by removing the line 43 (content = eval(body.content)) at /controllers/messages, and uncommenting the one below. Our mathjs-dependency will handle math expressions without accepting malicious code. No input should be handled through the eval()- method; setTimeout(), setInterval() and Function()-methods can also be dangerous.

Flaw #3: Broken access control

Our program, as mentioned, has an admin page. Try logging in and you will see a link to the page  (admin credentials; username: admin, password: 1pascal). You can’t log in if you haven’t fixed flaw #1.

An admin is allowed to delete posted messages. The page however is unintentionally accessable by anyone. On top of that clicking on delete-buttons if not logged in/logged in as a standard user will delete the message, which is unintentional aswell.

There are couple steps that we must do to fix this issue. First, uncomment ProtectedRoute from line 41 in /frontend/App.js  and delete the line below it. Now our application will check first the access rights of the user before viewing the admin page. 

Second, we must protect our api calls. Anyone can delete messages even if the page is invisible for non-admins. Postman can be used for example to send DELETE operations to http://localhost:3001/api/messages/:messageId (message id’s are viewed in listing). You can fix it by uncommenting lines 71-82 on /controllers/messages, which will make the delete call require admin authentication.

Flaw #4: Insufficient logging & monitoring

As mentioned in Owasp top 10, insufficient logging can be detrimental for software for various reasons. If the attacker manages to successfully attack software he may be able to do his damage without leaving any trace. Our current middleware handles some logging, but the execution is arguably lacking. On top of that the logs aren’t store anywhere, they’re simply printed on the terminal. 

We will use Morgan for our logging. Go to /backend/index.js, uncomment lines 24-26. After that do something on the website and check access.log – we’re storing logs now! This solution could be improved by creating a new log file daily, and storing the log files on a remote location, too.

Flaw #5: Sensitive data exposure
While our application doesn’t handle particularly sensitive data HTTPS should be implemented nonetheless. Our passwords are salted (done while fixing flaw #1), but it wouldn’t be harmful to have an additional layer of security, especially if the software gets expanded in the future.

We will create our own SSL certificate which will be used to demonstrate the HTTPS capabilities of the software. Go to /backend/security, run createSSL.sh. On /index.js, uncomment lines 34-39 and comment line 41. On /frontend/Protocol, change ’http’ to ’https’

The backend now runs on https, and you can run https frontend by entering HTTPS=true npm start on the terminal at /frontend. Of course, our self-made certificate isn’t recognized, causing the HTTPS connection to fail. The certificate can be added to the browser, but I find it being rather counterintuitive for our purposes as you would likely purchase/use a certificate from a hosting site if you were to use your software for real purposes.

Now we’ve (hopefully) solved the biggest security flaws. My solution is far from perfect, and I’m sure those who are experienced with the subject matter will be able to identify more flaws.
