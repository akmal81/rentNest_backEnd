# 🚀 Install npm and prisma
# 🚀 Install npm and prisma

# 🚀 env configuration

```     .env
        config/index.ts
```
        
# 🚀 Create catchAsync

```
/src
|--utils
 |--catchAsync.ts
```

# 🚀 Create sendResponse
        -- create type of ResponseData
```
/src
|--utils
 |--sendResponse.ts
```

# 🚀 Create notFound Routes middleware

```
/src
|--middleware
 |--notFound.ts
```

# 🚀 Create AppError class 

```
/src
|--errorHelper
 |--Apperror.ts
```
        
# 🚀 Create globalErrorHand middleware

```
/src
|--middleWares
 |--globalErrorHand.ts
```

# 🚀 Create Utils 
```
/src
|--utils
 |--jwt.ts
```
        craeteToken
        verifiedToken

# 🚀 Create auth middleware

```
/src
|--middlewares
 |--auth.ts
```

# 🚀 login user 
 1. Retrive the user with email
 2. Matched password
 3. If not matched password throw error
 4. Create a jwtPayload with user information (id, name, email, role)
 5. create accessToken user jwtUtils.CreateToken function 
 6. create refreshToken user jwtUtils.CreateToken function 
 7. return tokens to the controller 
 8. set accessToken and refreshToken to res.cookies 

```
src/
|--module
 |--auth
  |--auth.routes.ts
  |--auth.controller.ts
  |--auth.service.ts
  |--auth.interface.ts
```

# 🚀 Get my profile /me route

1. Get access token from req.cookies in the user.controller.ts file
2. Verify the token using jwtUtils.verifiedToken() Function
3. Check the verified token is a object not a string (if varification failed it return a string)
4. throw a AppError it varifyedToken is string
5. send the varifiedToken.id to user.service.ts getMyProfile function
6. Get the user data user id that taken from req.cookies verified jwtUtils.verifiedToken()
7. return the user

```
src/
|--module/
 |--user/
  |--user.routes.ts
  |--user.controller.ts
  |--user.service.ts
  |--user.interface.ts
```

# 🚀 Use of refresh token

1. Refresh token use for get new access token
2. when a accessToken is expaired refresh help to create new access token

**Process
1. create a route in auth.routes ('/refresh-token')
2. auth.controller.ts => crate a refreshToken function
3. get the refreshToken from req.cookies.refreshToken
4. send the refreshToken to authService.refreshToken function

5. auth.service.ts => crate a refreshToken Function
6. receive refreshToken as parameter 
7. verify token using jwtUtils.verifyToken()
8. checke the result is success:ture or throw AppError
9. destructure id from refreshToken
10. get user from database user prisma.user.findUniqueOrThrowError
11. check the user activestatus block or not throw AppError
12. create a new jwtPayload
13. create a new accessToken using jwtUtils.createToken()
14. Return {accessToken}
15. Set accessToken to res.cookie in the controller



# 🚀 Post module 

```
src/
|--modules/
 |--post/
  |--post.routes.ts
  |--post.controller.ts
  |--post.service.ts
  |--post.interface.ts

```
# 🚀 Create Post 
1. create interface of Create Post Payload post.interface.ts 


# 🚀 get all Post  searching filtering and pagination

A. post.service.ts => getAllPosts()

1. getAllPosts() has a parameter query
2. Create a interface extened with PostWhereInput of query IPostQuery => post.interface.ts 
3.getAllPosts =>
 *set limit with query.limit converting Number*
 *set page with query.limit converting Number*
 *set skip with the formula (page-1)Xlimit*
 *set default sortBy with query.sortBy ? query.sortBy : "createdAt"*
 *set default sortOrder with query.sortBy ? query.sortBy : "desc"*
3. when a query table has Field with array like tags[]
 *parse it using JSON.parse(query.tags as string)*
        # const tags = query.tags? JSON.parse(query.tags as string) : null #
 *convert the JSON.parse in to a array*
        # tagsArray = Array.isArray(tags)? tags:[] #
        
4. Declare the andCondition Array with PostWhereInput[] type
5. Start The pushign query value in the andconditions for partial query and exact query.
6. For The partial query use a OR condition of prisma and push the column name where search term apply
```ts
// search Partial query

    const getAllpost = async (query: IPostQuery) => {
   

    const limit = query.limit ? Number(query.limit) : 10;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * limit;
    const sortBy = query.sortBy ? query.sortBy : "createdAt";
    const sortOrder = query.sortOrder ? query.sortOrder : "desc";
    // array search
    const tags = query.tags ?  JSON.parse(query.tags as string): null;
    const tagsArray = Array.isArray(tags)? tags :[]


    const andCondition: PostWhereInput[] = [];

    // search Partial query
    

    if (query.searchTerm) {
        console.log(query.searchTerm);
        andCondition.push(
            {
                OR: [
                    {
                        title: {   //search appliy on title
                            contains: query.searchTerm,
                            mode: "insensitive"
                        }
                    },

                    {
                        content: { //search appliy on content
                            contains: query.searchTerm,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        )
    }


    // exact query (must be matched with the query element not like search)

    if(query.title){andCondition.push({title:query.title})}
    if(query.content){andCondition.push({content:query.content})}
    if(query.authorId){andCondition.push({authorId:query.authorId})}
    if(query.isFeatured){andCondition.push({isFeatured:query.isFeatured})}
    if(query.tags){andCondition.push({tags:{hasSome:tagsArray}})}
    if(query.status){andCondition.push({title:query.title})}
    
    // only free post should get to do this push isPremium: false
    andCondition.push({isPremium:false})

    const posts = await prisma.post.findMany({
        where: {
            AND:andCondition
        },
        //  paginition
        take:limit,
        skip:skip,
        orderBy:{
            [sortBy]:sortOrder
        },
        include:{
            author:{
                omit:{
                    password:true
                }
            },
            comments:true
        },
    });


```


 





