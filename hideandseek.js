
class World{
    
    constructor(size) {
        this.size = size
        this.divs = []
        this.map = []
        this.populatemap()
        this.createObstacles(2)
        this.head = {}
        this.head.x = 0
        this.head.y = 0
        this.map[this.head.y][this.head.x] = 1
        this.enemies = []
        this.createEnemies(1)
       //console.log("Enemies = ",this.enemies)
        this.timer=null

        
    }
/**
 * Create black boxes in the map
 * @param {*} n 
 */
    createEnemies(n){
        this.enemies=[]
        for (let i = 0; i < n; i++){
            const x = Math.round(Math.random() * this.size) 
            const y = Math.round(Math.random() * this.size)
            this.enemies.push([x, y])
            this.map[x][y] = 3
        }


    }

/**
 * 
 * @param {string} key The key pressed by the user used to move the green box 
 */

    moveMan(key) {
        const x = this.head.x
        const y = this.head.y
        this.map[this.head.y][this.head.x] = 0

        if(key=="8"){this.head.y-=1}
        else if(key=="2"){this.head.y+=1}
        else if(key=="4"){this.head.x-=1}
        else if(key=="6"){this.head.x+=1}
        else if(key=="5"){this.head.y+=1}
        if(this.head.x<0){this.head.x=0}
        if (this.head.y < 0) { this.head.y = 0 }
        if(this.head.x>=this.size){this.head.x=size-1}
        if(this.head.y>=this.size){this.head.y=size-1}
        if(this.map[this.head.y][this.head.x]==2){
            this.head.x=x
            this.head.y=y
        }
        if(this.map[this.head.y][this.head.x]==3){
            this.head.x=x
            this.head.y=y
        }
        this.map[this.head.y][this.head.x] = 1
        
        this.updatedivs()
    
    }

    /**
     * Create the map of the world
     */
    populatemap() {
        for (let i = 0; i < this.size; i++) {
            this.map.push([])
            for (let j = 0; j < this.size; j++) {
                this.map[i].push(0)
            }
        }
    }

    /**
     * Erase the map of the world
     */

    restart(){
        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                this.map[i][j]=0
            }
        }
    }
/**
 * Create the divs of the world in the html page
 * @param {Object} document Html document 
 * @param {Object} container A div container in the html page
 */
    createDivs(document,container) {
        
        for (let i = 0; i < this.size; i++){
            for(let j=0;j<this.size;j++){
                this.divs.push(document.createElement("div"))
                this.divs[this.divs.length-1].classList.add("square")
                this.divs[this.divs.length-1].style.width=width/size+"px"
                this.divs[this.divs.length-1].style.height=width/size+"px"
                this.divs[this.divs.length-1].style.backgroundColor="white"
                this.divs[this.divs.length-1].style.border="1px solid black"
                this.divs[this.divs.length-1].style.display="inline-block"
                this.divs[this.divs.length-1].style.margin="0px 0px 0px 0px"
                this.divs[this.divs.length-1].style.padding="0px 0px 0px 0px"
                this.divs[this.divs.length-1].style.fontSize="0"
                container.appendChild(this.divs[this.divs.length-1])
            }

        }
        this.updatedivs()
    }

    /**
     * Update the divs of the world in the html page
     */
    updatedivs(){

        for(let i=0;i<this.map.length;i++){
            for(let j=0;j<this.map[i].length;j++){
                if(this.map[i][j]==2){
                    this.divs[i*this.size+j].style.backgroundColor="red"
                }else if(this.map[i][j]==1){
                    this.divs[i*this.size+j].style.backgroundColor="green"
                }
                else if(this.map[i][j]==3){
                    this.divs[i*this.size+j].style.backgroundColor="black"
                }
                else{
                    this.divs[i*this.size+j].style.backgroundColor="white"
                }
            }
        }
    }

    /**
     * Create n obstables in the map
     * @param {Number} n number of obstacles
     * @param {Object} a array of obstacles
     */

    createObstacles(n,a=[]) {
        //console.log(this.map)
       // console.log(this.size)
        if (a.length == 0) {
            for (let i = 0; i < n; i++) {
                const x = Math.round(Math.random() * (this.size-1))
                const y = Math.round(Math.random() * (this.size-1))
             //    console.log(x,y)
                this.map[x][y] = 2
            }
        } else {
            a.forEach((element) => {
                this.map[element[0]][element[1]] = 2
            })
        }

       // console.log(this.map)
      

    }

    /**
     * Start the game
     * @param {Number} delay Delay in milliseconds before the game starts
     * @param {Number} interval Interval in milliseconds between each move of the enemies
     * @param {Object} a Array of obstacles
     */
    startGame(delay=2000,interval=300,a=[]) {
        if (this.timer == null) {
            this.restart()
            this.createObstacles(7, a)
            this.head.x = 0
            this.head.y = 0
            //green box is created
            this.map[this.head.y][this.head.x] = 1
            //this.createEnemies(1)
            this.enemies = []
            this.enemies.push([0, 9])
            this.enemies.push([7, 7])
            this.map[this.enemies[0][0]][this.enemies[0][1]] = 3
            this.updatedivs()
            setTimeout(() => {
                this.timer = setInterval(() => {
                    this.moveEnemies()
                  // console.log("Timer")
                }, interval)
            }, delay);
        } else { console.log("Game already started") }

    }
   /**
    * Stop the game
    */
    stopGame() {
        clearInterval(this.timer)
        this.timer = null
    }

/**
 * Move the enemies
 */
    moveEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.map[this.enemies[i][0]][this.enemies[i][1]] = 0
            //console.log("Lest star search the path")
            const e = [[[...this.enemies[i]]]]
            //console.log("E= ",e)        
            this.enemies[i] = [...this.find_path(e)]            
            const x = this.enemies[i][0]
            const y = this.enemies[i][1]
  
            if(this.map[x][y]==1){
                alert("Game Over")
                this.restart()
                clearInterval(this.timer)
                this.timer = null
                //console.clear()
                break
            }
            this.map[x][y] = 3

        
        }
        this.updatedivs()

            
    }

/**
 * Find the path to the green box
 * @param {Object} m Array of the enemies
 * @param {Number} count Number of iterations
 */
 

    find_path(m,count=0){
        const z = []
        
        for (let i = 0; i < m.length; i++){
           // console.log("n= ", m.length)
            
            const element=m[i]
            const last=element[element.length-1]
           // console.log("Last= ",last)
           // console.log("Element= ", element)
          //  console.log(this.map[last[0] + 1][last[1]])
            
            if(last[0]<9 && this.map[last[0]+1][last[1]]==0){
                if(this.check(element,[last[0]+1,last[1]])){
                    z.push([...element,[last[0]+1,last[1]]])
                }
           
            }
            if(last[0]<9 && this.map[last[0]+1][last[1]]==1){
              //  console.log("Game over 0")
                z.push([...element, [last[0] + 1, last[1]]])
               // console.log("We have found the path", z[z.length - 1][1])
               // console.log(z)
                return z[z.length-1][1]
            }

            if(last[0]>0 && this.map[last[0]-1][last[1]]==0){
                if(this.check(element,[last[0]-1,last[1]])){
                    z.push([...element,[last[0]-1,last[1]]])
                }
          
            }
            if(last[0]>0 && this.map[last[0]-1][last[1]]==1){
               // console.log("Game over 1")
                z.push([...element, [last[0] - 1, last[1]]])
                //console.log("We have found the path", z[z.length - 1][1])
                //console.log(z)
                return z[z.length-1][1]
            }

            if(last[1]<9 && this.map[last[0]][last[1]+1]==0){
                if(this.check(element,[last[0],last[1]+1])){
                    z.push([...element, [last[0], last[1] + 1]])
                    
                }
      

            }
            if(last[1]<9 && this.map[last[0]][last[1]+1]==1){
                //console.log("Game over 2")
               // console.log("Element= ",element)
                z.push([...element,[last[0],last[1]+1]])
              //  console.log("We have found the path", z[z.length - 1][1])
                //console.log(z)
                return z[z.length-1][1]
            }


            if(last[1]>0 && this.map[last[0]][last[1]-1]==0){
                if(this.check(element,[last[0],last[1]-1])){
                    z.push([...element,[last[0],last[1]-1]])
                }

            }
            if(last[1]>0 && this.map[last[0]][last[1]-1]==1){
               // console.log("Game over 3")
                z.push([...element, [last[0], last[1] - 1]])
               // console.log("We have found the path", z[z.length - 1][1])
              //  console.log(z)
                return z[z.length-1][1]
            }
            

        }

       // const new_z = this.selectpath(z, [this.head.x, this.head.y], 60)
        //console.log("New_z= ",new_z)
        
        if (z.length > 2**10) {
            //console.log(count)
           // console.log(z.length)
            return z[z.length-1][1]
        }
        return this.find_path(z,count+1)
    }

    /**
     * Check if the point x is in the array v
     * @param {Object} v Array os points 
     * @param {Object} x Point
     * @returns 
     */

    check(v,x){
        for(let i=0;i<v.length;i++){
            if(v[i][0]==x[0] && v[i][1]==x[1]){

                return false
            }
        }
        return true
    }

    selectpath(paths, target, limite = 10) {
    
        function calcdist(a, b) {
            let x = a[0] - b[0]
            let y = a[1] - b[1]
            return Math.sqrt(x * x + y * y)
        }
    
        let d = []
    
        for (let i = 0; i < paths.length; i++) {
            //console.log(a[i])
            const n = paths[i].length
            //console.log(n)
            const x= paths[i][n-1]
            d.push([i, calcdist(x, target)])
        }
    
        d.sort(function (a, b) {
            return a[1] - b[1]
        })
    
        function reduceN(a,n=10) {
            const limite = (a.length < n) ? a.length : n
            return a.slice(0, limite)
        }
    
        const selected_path = []
    
        const x = reduceN(d,limite)
    
        x.forEach(element => {
            selected_path.push(paths[element[0]])    
        });
    
        return selected_path
    
    
    
        
    
    }
    
    
        
}