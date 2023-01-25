import { ApolloServer, gql } from "apollo-server";

const tweets = [
	{
		id: "1",
		text: "hello 1",
	},
	{
		id: "2",
		text: "hello 2",
	},
];

// Query : get
// Mutation : post, put, delete
// [] : list를 나타냄
// (id:ID) : argument, rest api 에서 ":id" 와 같음!
// ! 은 null 이 될 수 없음을 나타냄 (nullable filed)
const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		firstname: String!
		lastname: String!
	}
	type Tweet {
		id: ID
		text: String
		author: User
	}
	type Query {
		allTeweets: [Tweet!]!
		tweet(id: ID!): Tweet
	}
	type Mutation {
		postTweet(text: String!, userId: ID!): Tweet!
		deleteTweet(id: ID!): Boolean!
	}
`;

const resolvers = {
	Query: {
		tweet() {
			console.log("콜");
			return null;
		},
		allTeweets() {
			return tweets;
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

// 그래프큐엘은 데이터 shape을 미리 알고 있어야한다 -> 타입 데피니션이 필요함
server.listen().then(({ url }) => {
	console.log(`Running on ${url}`);
});
