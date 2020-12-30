all: test

test:
	rsync -a --delete ./src/ ~/Private/webspace/dishpos-test

	

productive:


demo:
	rsync -a --delete ./src/ ~/Private/webspace/dishpos-demo
