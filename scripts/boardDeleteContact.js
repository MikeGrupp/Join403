/**
 * Removes a contact from all tasks
 *
 * @async
 * @param {string} contactId - The ID of the contact to remove
 * @returns {Promise<string>} The ID of the removed contact
 */
async function removeExistingContactFromTasks(contactId) {
  tasks = await loadData("tasks/");
  for (const taskId in tasks) {
    if (tasks.hasOwnProperty(taskId)) {
      const task = tasks[taskId];
      if (task.assignedAccounts && task.assignedAccounts.hasOwnProperty(contactId)) {
        deleteContactFromTasks(taskId, contactId);
      }
    }
  }
  return contactId;
}

/**
 * Deletes a contact from a specific task
 *
 * @async
 * @param {string} taskId - The ID of the task
 * @param {string} contactId - The ID of the contact
 */
async function deleteContactFromTasks(taskId, contactId) {
  return await deleteData(
    "/tasks/" + taskId + "/assignedAccounts/" + contactId
  );
}
