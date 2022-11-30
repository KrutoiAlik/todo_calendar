export default class Utils {

    static generateWhereConditionsString(params: any, joinWithOperator: string): string {
        return Object.keys(params)
            .filter(key => !!params[key])
            .map(key => `${key} = ${params[key]}`)
            .join(` ${joinWithOperator} `);
    }
}