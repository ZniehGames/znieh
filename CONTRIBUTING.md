Contributing
-----

Znieh is an open source videogame, powered by Znieh Games.

We use a Service-oriented architecture (SOA) and follow Behavior-Driven-Development practices.
In the next sections, you will learn how to contribute to the codebase.

## Useful commands

Update your database schema:

    $ php app/console doctrine:schema:update -f
    
Then add some data:

    $ php app/console doctrine:fixtures:load

If you need to update a specific environment (eg. test) database use `-e`:

    $ php app/console doctrine:schema:update -f -e test
    $ php app/console doctrine:fixtures:load -e test

## Behavior-Driven-Development

### Tools used

| Methodology | Frontend (Angular.js) + Gameserver (Node.js)    |  Api Backend (Symfony) |
|:-----------:|:-----------------------------------------------:|:----------------------:|
| SpecBDD     |  Karma & Jasmine                                | PhpSpec                |
| StoryBDD    |  Protractor & Cucumber.js                       | Behat                  |


## Submit your Patch

Start by creating your own branch:

    $ git checkout -b BRANCH_NAME master
	# add some commits for your patch
	
Then update your branch to the latest version of master:

	$ git rebase origin master

Resolve conficts if any:

	$ git add ... # add resolved files
	$ git rebase --continue

Push your branch remotely:

	$ git push origin BRANCH_NAME

Now, you can create your Pull-Request and wait for feedbacks.

Often, Znieh Games members will ask you to "squash" your commits. This means you will convert many commits to one commit. To do this, use the interactive rebase command:

    $ git rebase -i
    $ git push -f origin BRANCH_NAME

[Learn more on squashing commits with rebase.](http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html)
