<h1 align="center">COMP4050 - Community Barter Site</h1>

## Download and Setup
1. Clone the repository using the following:
```
$ git clone https://github.com/rako210/Comp4050.git
```
1. Open the project using PyCharm.
1. Right-click `main.py` and select `Run 'main'`.
1. Navigate to http://127.0.0.1:8010/

## Commiting Updates

If you want to implement something new please create a new branch along with the name of the feature you want to implement:
```
$ git branch branch_name
$ git checkout branch_name // Navigates to your newly created branch
```

Once you have implemented whatever it is that needed to be done you can then merge your work into the master branch:
```
$ git checkout master // Navigate back to main branch
$ git merge branch_name // Type in the branch you want to merge with
```
Once you have successfully completed the merge, delete the old branch by:
```
$ git branch -d branch_name
```

## Reset your local directory
Sometimes you will want to scrap some of the work you done or you just want to reset your workspace. You can do so by:
```
$ git fetch origin // Update your local repository. Note: this does not update your local directory
$ git reset --hard origin/master // This will delete any local commits you have made that have not already been pushed
$ git clean -f // Which will remove any local files you may have added
```