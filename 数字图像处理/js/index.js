var item1 = document.querySelector('.item1');

item1.addEventListener('click',function(event){
  let boxDisplay = item1.querySelector('ul').style.display;
  if(boxDisplay === 'none'){
    item1.querySelector('ul').style.display = 'block';
    setTimeout(()=> {
      item1.querySelector('ul').style.opacity = 1;
    });
  }else {
    item1.querySelector('ul').style.display = 'none';
    setTimeout(()=> {
      item1.querySelector('ul').style.opacity = 0;
    });
  }
},false)
item1.addEventListener('mouseleave',function(event){
  item1.querySelector('ul').style.display = 'none';
},false);


小杜有一个小写字母组成的字符串s，字符串s已经被写在墙上，小杜还有很多卡片，每个卡片
有一个小写字母，组成一个字符串t，小杜可以选择字符串t中人任意一个字符，然后覆盖在字符串s的一个
字符上，小杜想知道在选取一些卡片覆盖s的一些字符之后，可以得到的字典序最大的字符串是什么


输入描述：
输入包括俩行，第一行一个字符串s，字符串s长度length(1 <= length <= 50)
，s中的每个字符都是小写字母
第二行一个字符串t，字符串t长度length（1 <= length <= 50），t中每个字符都是小写
字母

输出描述：
输出一个字符串，既可以得到的字典序最大字符串

示例：
输入：
fedcba
ee

输出：feeeba

import java.util.Arrays;
import java.util.Scanner;

public class Main {

    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        String tempS = scanner.nextLine()
                ,tempT = scanner.nextLine();
        char[] s = tempS.toCharArray(),
                t = tempT.toCharArray();
        Arrays.sort(t);
        for(int i = t.length-1, j = 0; i>=0; i--){
            while(j + 1 < s.length && s[j] >= t[i]){
                j ++;
            }
//            System.out.println(i+" "+j);
            if(s[j] < t[i])s[j] = t[i];
        }
        for(char i : s){
            System.out.print(i);
        }
        System.out.println();
    }
}

if (data['day'] === 0){
  span[0].style.display = 'none';
} else if (data['hour'] === 0){
  span[1].style.display = 'none';
} else if (data['min'] === 0) {
  span[2].style.display = 'none';
} else if (data['second'] === 0) {
  span[3].style.display = 'none';
}