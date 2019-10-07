
# Manage states with Apollo Client. But in a few lines.

Anyone who is used to using apollo-client as state manager knows that has a fantastic but bureaucratic tool at hand.

A changing in a list of todos, for example, can be a reasonably uncomfortable task, like the twenty-something lines of [code below](https://www.apollographql.com/docs/react/data/local-state/#writequery-and-readquery) :

![[https://www.apollographql.com/docs/react/data/local-state/#writequery-and-readquery](https://www.apollographql.com/docs/react/data/local-state/#writequery-and-readquery)](https://cdn-images-1.medium.com/max/3520/0*8Blhc_aN-4QbttU0.png)*[https://www.apollographql.com/docs/react/data/local-state/#writequery-and-readquery](https://www.apollographql.com/docs/react/data/local-state/#writequery-and-readquery)*

Expecting to reduce the effort on jobs like these, I’ve been thinking of ways to make them a little simpler and more straightforward.

The question I’ve tried to answer recently was: is there a way to make this task as simple as using the hook [useState](https://reactjs.org/docs/hooks-state.html)?

And yes, it is possible. In the next few lines, I will share the answer found.

## useAppState

The use of [hooks](https://reactjs.org/docs/hooks-intro.html) is a powerful resource for structuring the behavior of our applications.

It’s amazing how many lines of code I’ve been saving by encapsulating the behavior of my components in these functions.

Since I adopted useState for the local state management of my components, I've been looking for ways to do the same for a broader scope.

For this purpose, I wrote the package [useAppStat](https://github.com/helloncanella/useAppState)e.
[**helloncanella/useAppState**
*Control the whole app’s state with the ease of a useState. *github.com](https://github.com/helloncanella/useAppState)

With it, you can modify a cached state to, for example, open and close a floating menu.

![](https://cdn-images-1.medium.com/max/2640/0*upABggaB-QL6GMaV.png)

We have above two isolated components that share the same state isOpen. At the same time, the hook provides a setter that allows the change of this value.

<iframe src="https://medium.com/media/893de8c8c12286ce2c48c1e683c48642" frameborder=0></iframe>

## Variables

You may assign variables to your *queries* as follows:

![](https://cdn-images-1.medium.com/max/2640/0*aP-X51GuJjQ8883R.png)

We can illustrate this with an example involving two counters:

<iframe src="https://medium.com/media/efec761fc3ecf2154605fae1105d4b55" frameborder=0></iframe>

The components of this example are structured as follows.

![](https://cdn-images-1.medium.com/max/3880/0*6msOUj6uQQl3-9lR.png)

Internally, the way the display Counter to and its controller button AddOneButton are organized is shown below:

![](https://cdn-images-1.medium.com/max/2640/0*4xHsOwk0VTbG_fyC.png)

The hook useCount encapsulates the behavior of our components as well as the details of interacting with our package, as detailed below:

![](https://cdn-images-1.medium.com/max/2640/0*uJhnXo3P8M-Y114n.png)

Note the use of variables in the call of useAppState. It is precisely the assignment of different values to label that gives independence to the states of the counters A and B.

## Updating queries without [@client](https://www.apollographql.com/docs/react/data/local-state/#local-resolvers)

Although the above examples focus on updating *queries* with the [@client](https://www.apollographql.com/docs/react/data/local-state/#local-resolvers) directive*, *useAppState can be used to update any cached data*.*

Any list fetched from the server could be updated locally like this.

![](https://cdn-images-1.medium.com/max/2248/0*kuqDqPJlyl5Fu1Z5.png)

<iframe src="https://medium.com/media/56a7aa9e3f4038388e1c5709ffe570cc" frameborder=0></iframe>

## Under the hood

Internally, useAppState uses the hook [useQuery](https://www.apollographql.com/docs/react/api/react-hooks/#usequery), [launched](https://blog.apollographql.com/apollo-client-now-with-react-hooks-676d116eeae2) in August 2019, to reactively access the state of the query. At the same time, a call to [client.writeQuery](https://www.apollographql.com/docs/react/v2.5/advanced/caching/#writequery-and-writefragment) is encapsulated by its setter*.*

The elaboration of this hook involved approximately 40 lines and is available at the [link](https://github.com/helloncanella/useAppState/blob/master/src/useAppState.js).

I hope this little utility allows you to write a little less :)
