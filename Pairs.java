import java.util.ArrayList;

	import java.util.*;
public class Pairs {
	
	
	static int i;
	static String s;
	public Pairs(int i,String s) {
		this .i=i;
		this.s=s;
	}
	public static double getValue(String s) {
		double val;
		switch(s) {
		case("A+"):val=0.7; break;
		
		case("A"):val=1;break;
		case("A-"):val=1.3;break;
		case("B+"):val=1.7;break;
		case("B"):val=2;break;
		case("B-"):val=2.3;break;
		case("C+"):val=2.7;break;
		case("C"):val=3;break;
		case("C-"):val=3.3;break;
		case("D+"):val=3.7;break;
		case("D"):val=4.0;break;
		case("F"):val=5.0;break;
		default:val=-1;
		}
		return val;
	}
	public static double getsum(Pairs p) {
		double sum=i*getValue(s);
		return sum;
	}
	public static void main(String[]args) {
		double sum=0;
		Scanner sc=new Scanner(System.in);
		int n=sc.nextInt();
		Pairs[]a=new Pairs[n];
		for(int i=0;i<n;i++) {
			a[i]=new Pairs(sc.nextInt() ,sc.nextLine());
			sum+=getsum(a[i]);
		}
			
		
		
			
		double GPA=sum/n;
		System.out.print(GPA);
	}
}
	





