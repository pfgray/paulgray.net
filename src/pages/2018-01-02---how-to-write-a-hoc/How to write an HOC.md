## How to write an HOC (in 3 easy steps).

A lot of times when writing software we end up solving similar problems in similar ways. Sometimes we even copy-paste a chunk of code and change just a little bit of it. If you've done this before, don't feel bad; every developer has done this at some point in their career. If you find yourself doing this a lot, you should look for ways to reuse code and solutions that are similar. This principle is called the [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), which stands for "Don't Repeat Yourself." The benefit of generalizing your solution is that it allows you to not have to solve the same problem twice!  

A mark of a good software developer is being able to recognize patterns in code and being able to write a generic solution for that pattern.
  
## Step 1: Recognize a pattern.

Let's say we have a component that displays the current user's profile. When it mounts, it fires an xhr request to fetch a user's details, and then displays them:

```
class UserProfile extends Component {
  constructor() {
    this.state = {
      loading: true,
      user: null
    };
  }
  componentDidMount() {
  ‎  fetch('/api/user')
  ‎    .then(user => {
  ‎      this.setState({
          loading: false,
  ‎        user: user
  ‎    });
    })
  ‎},
  render() {
    if(this.state.loading) {
      return (
        <div>loading</div>;
      )
    } else {
      return (
        <div>{this.state.user.username}</div>;
      )
    }
  }
}
```

Let's design another similar component for fetching and displaying a list of tweets. This one will do the same thing: when it mounts, it fires an xhr request to fetch some tweets, and then displays them:

```
class TweetList extends Component {
  constructor() {
    this.state = {
      loading: true,
      tweets: null
    };
  }
  componentDidMount() {
  ‎  fetch('/api/tweets')
  ‎    .then(tweets => {
  ‎      this.setState({
          loading: false,
  ‎        tweets: tweets
  ‎    });
    })
  ‎},
  render() {
    if(this.state.loading) {
      return (
        <div>loading</div>;
      )
    } else {
      return (
        <div>{
          this.state.tweets.map(tweet => (
            <span>{tweet.user}: {tweet.body}</span>
          )}
        </div>
      )
    }
  }
}
```

These two components are very similar; they fetch some data, and then display it, showing a 'loading' view while the request is loading.

Let's take a step back for a second and examine these two components.  

**How are they similar?** They both send off a request for data, which they later render. They also both have the same 'loading' view for when the request is resolving.

**How are they different?** They both use different urls, and they both render different views once the data has been loaded.

## Step 2. Put the common parts in a function.
Let's take the common elements, and put them into a function:

```
const withFetch = () => {
	return class WithFetch extends Component {
	  constructor() {
	    this.state = {
	      loading: true,
	      data: null
	    };
	  }
	  componentDidMount() {
	  ‎  fetch(....)
	  ‎    .then(data => {
	  ‎      this.setState({
	          loading: false,
	  ‎        data: data
	  ‎    });
	    })
	  ‎},
	  render() {
	    if(this.state.loading) {
	      return (
	        <div>loading</div>;
	      )
	    } else {
	      return (
	        ...
	      )
	    }
	  }
	}
}
```

## Step 3: Make the different parts parameters of that function.

Now that we have the similar code in a function, let's make the different code (the url and view) parameters of that function:

```
const withFetch = (url) => (View) => {
	return class WithFetch extends Component {
	  constructor() {
	    this.state = {
	      loading: true,
	      data: null
	    };
	  }
	  componentDidMount() {
	  ‎  fetch(url)
	  ‎    .then(data => {
	  ‎      this.setState({
	          loading: false,
	  ‎        data: data
	  ‎    });
	    })
	  ‎},
	  render() {
	    if(this.state.loading) {
	      return (
	        <div>loading</div>;
	      )
	    } else {
	      return <View data={data} />
	    }
	  }
	}
}
```

(Notice how we pass the data down to the view).

The double parameter list (`(url) => (View) =>` instead of `(url, View) =>`) might look confusing, but it's a convention for HOC's which makes them easier to combine with other HOC's; it can be ignored for now.


Now, let's re-implement our two components using this shiny new HOC:

```
const UserProfile = 
  withFetch('/api/user)(props => (
    <div>{props.data.username}</div>
  ));

const TweetList = 
  withFetch('/api/tweets)(props => (
    <div>
      {this.state.tweets.map(tweet => (
        <span>{tweet.user}: {tweet.body}</span>
      )}
    </div>
  ));
```

We've cut out a _ton_ of our code duplication, making our solutions simpler and easier to manage. Also, if we find a bug in our data-fetching logic, we only have to fix it in one spot!
