## **FOLLOW UP QUESTIONS**

1. **How would you ensure that any AI-generated suggestions are appropriate?**
   - If I were running this in production, I'd probably lean on Azure AI Foundry's content filters to keep things safe and appropriate. For this project, though, I'd use a mix of strong prompt engineering (telling the model what NOT to do), and some backend post-processing—like scanning for banned words or even asking the LLM to double-check its own output for anything sketchy. Also use logs to see if things are working or need improving also. 

2. **How would you protect this service from attempts to leak AI internals, such as system prompts?**
   - I’d make sure the backend never returns the system prompt or any model config in API responses. I’d also sanitize all LLM outputs to strip anything that looks like it’s echoing the prompt. Again I would even use the LLM itself to review the prompt to see if it was acceptable if cost wasn't a issue. Prompt engineering helps here too—remind the model not to reveal its instructions. And I’d monitor logs for weird requests or outputs, plus add rate limiting to make prompt injection harder. I also believe that azure and ChatGPT now do a lot of this stuff for you depending on the application and what you are trying to do. 

3. **How would you keep costs low for this service? If using a third party for an AI model, how would you avoid bad actors causing high usage/costs?**
   - I think this is perfect for low traffic offline use or internal use. I'd stick with this for simple things as it's got no upfront cost and is great for experimentation. If it was production I would likely implement prompt caching, Oauth2 authentication and ratelimiting + quotas for each user especially if it was a free service. If it was a free public thing maybe make them use there own API keys?  

4. **What would you change about running your service in a high-traffic production environment? What supporting services would be useful?**
   - The service is pretty hacky right now. I'd want to change quite a lot. I'd store user credentials in a database. Use Redis for caching if applicable and likely try to use load balancers and auto scalers like kubernetes. It would also be really important to implement proper logging where it's easy to see and service health checks. Also it would be important to implement CI/CD and good code practices to ensure it was being developed properly. I would also write unit tests for my backend functions (If they weren't using a LLM this would be easier.)

5. **What’s something you would add to or change about your solution if you had a week to work on it?**
   - 100% I would use a LLM API like openAPi or azure AI foundary. I did it this way so that the whole thing could be a easy deployable solution that requires no one to need to setup anything just run docker-compose up. I would also look into other models and parameters a bit more. I think if I had more time I could of got tinylamma working but it was refusing to behave so I have gone for a larger model. 

   I'd also introduce a better loading screen for the app as currently it's a bit vauge. 
   
   And set up automated tests and CI/CD for smoother development. I would also write unit tests for more of the code. 
