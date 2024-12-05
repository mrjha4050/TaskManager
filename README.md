# Task_management


Features

	•	Add Task: Users can input a task title and submit it. The task will then be displayed on the Kanban board.
	•	Display Tasks: All tasks fetched from the backend are displayed in a list format.
	•	Delete Task: Users can remove tasks by clicking the “Delete” button next to each task.
	•	Exit: Redirects users back to the homepage.
    .   Authentication : firebase , and i have also used token based authenctiocation , but it show error sometimes , so have removed that

Setup

	1.	Dependencies:
	•	React: UI library
	•	Axios: For HTTP requests
	•	React Router: For routing and navigation
	2.	Environment:
	•	Ensure the backend server is running on localhost:5001.
	•	The backend must have routes configured for GET, POST, and DELETE requests at /api/tasks.
	3.	Installation:
	•	Install Node.js and npm.
	•	Clone the repository and navigate to the project directory.
	•	Run npm install to install the required packages.
	•	Run npm start to start the frontend development server.

API Interaction

	1.	Fetch Tasks:
	•	Endpoint: GET /api/tasks
	•	Function: fetchTasks
	•	Description: Retrieves all tasks from the server and updates the component state to display them.
	2.	Add Task:
	•	Endpoint: POST /api/tasks
	•	Function: addTask
	•	Payload:

{
  "title": "task title",
  "roomId": "specific room ID",
  "description": "optional description",
  "status": "task status"
}


	•	Description: Sends a new task to the server. The task is added to the state and displayed if the request is successful.

	3.	Delete Task:
	•	Endpoint: DELETE /api/tasks/{id}
	•	Function: removeTask
	•	Parameters: Task ID (id)
	•	Description: Deletes a task from the server and updates the state to remove it from the display.

Usage

To add a task:
	1.	Enter the task title in the input field.
	2.	Click the “Add Task” button. If successful, the task will appear in the list.

To delete a task:
	•	Click the “Delete” button next to the task you wish to remove.

To exit the board:
	•	Click the “Exit” button to return to the homepage.

Error Handling

## Creating tasks is currently not happening due to an ongoing issue with Axios errors. Despite multiple attempts to resolve this, it seems I’ll need more time and additional research to fully address the problem. I have tried various troubleshooting methods without success.

 # when i try to push on github this error is displayed

remote: Resolving deltas: 100% (19/19), completed with 7 local objects.
remote: error: GH013: Repository rule violations found for refs/heads/main.
remote:
remote: - GITHUB PUSH PROTECTION
remote:   —————————————————————————————————————————
remote:     Resolve the following violations before pushing again
remote:
remote:     - Push cannot contain secrets
remote:
remote:
remote:      (?) Learn how to resolve a blocked push
remote:      https://docs.github.com/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-from-the-command-line#resolving-a-blocked-push
remote:
remote:
remote:       —— Google Cloud Service Account Credentials ——————————
remote:        locations:
remote:          - commit: 6f56ead7295ac9bfc2543cca39a8f955104ba793
remote:            path: backend/Taskmanager Firebase Admin SDK.json:1
remote:
remote:        (?) To push, remove secret from commit(s) or follow this URL to allow the secret.
remote:        https://github.com/mrjha4050/Task_management/security/secret-scanning/unblock-secret/2plgfJ51cXs2s4mbTdLr43BiMIv
remote:
remote:
remote:
To https://github.com/mrjha4050/Task_management.git
 ! [remote rejected] main -> main (push declined due to repository rule violations)
error: failed to push some refs to 'https://github.com/mrjha4050/Task_management.git'