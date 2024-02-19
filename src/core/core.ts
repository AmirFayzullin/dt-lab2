import { Matrix } from "../setup/setup";

type MinMaxResult = {
    index: number,
    value: number
}

export class Core {
    g: number[][] = []
    h: number[][] = []

    M: MinMaxResult[] = []
    V: MinMaxResult[] = []

    constructor(
        private readonly A: Matrix,
        private readonly I: number,
        private readonly J: number,
        private readonly K: number
    ) {}

    run() {
        let k = 0

        this.g.push(this.A.map(row => row[0]))
        this.h.push(this.A[k].slice(0, this.J))

        this.M.push(this.getMin(this.g[k]))
        this.V.push(this.getMax(this.h[k]))
        
        k++
        
        for (k; k < this.K; k++) {
            const m = this.M[k-1]
            const v = this.V[k-1]

            let gList = []
            for (let i = 0; i < this.I; i++) {
                const g = this.g[k-1][i] + this.A[i][v.index];
                gList.push(g)
            }

            this.g.push(gList)
            
            const mMin = this.getMin(gList)
            
            this.M.push({...mMin, value: mMin.value/(k+1)})

            

            let hList = []
            for (let i = 0; i < this.J; i++) {
                const h = this.h[k-1][i] + this.A[m.index][i];
                hList.push(h)
            }

            this.h.push(hList)
            
            const vMax = this.getMax(hList)
            
            this.V.push({...vMax, value: vMax.value/(k+1)})
        }

        console.log(this.g, this.h, this.M, this.V)
    }

    private getMin(arr: number[]): MinMaxResult {
        return arr.reduce<MinMaxResult>(
            (acc: MinMaxResult, cur: number, index: number) => {
                if (cur < acc.value) {
                    return {index, value: cur}
                }
                return acc
            },
            {
                index: 0,
                value: arr[0]
            }    
        )
    }

    private getMax(arr: number[]): MinMaxResult {
        return arr.reduce<MinMaxResult>(
            (acc: MinMaxResult, cur: number, index: number) => {
                if (cur > acc.value) {
                    return {index, value: cur}
                }
                return acc
            },
            {
                index: 0,
                value: arr[0]
            }    
        )
    }
}