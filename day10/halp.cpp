#include <iostream>
#include <bits/stdc++.h>
using namespace std;

int main()
{
    int arr[]= {0,84,60,10,23,126,2,128,63,59,69,127,73,140,55,154,133,36,139,4,70,110,97,153,105,41,106,79,145,35,134,146,148,13,77,49,107,46,138,88,152,83,120,52,114,159,158,53,76,16,28,89,25,42,66,119,3,17,67,94,99,7,56,85,122,18,20,43,160,54,113,29,130,19,135,30,80,116,91,161,115,141,102,37,157,129,34,147,142,151,68,78,24,90,121,123,33,98,1,40};
    int size = sizeof(arr) / sizeof(arr[0]);
    sort(arr,arr+size);
  
    unsigned long long int* nums = new unsigned long long int[size];
    for (int i = 0; i < size; i ++) {
        nums[i] = 0;
   }
    nums[0] = 1;
    for (int i = 0; i < size; i ++) {
        if(i >= 3 && arr[i] - arr[i - 3] <= 3) {
            nums[i] += nums[i - 3];
        }
        if(i >= 2 && arr[i] - arr[i - 2] <= 3) {
            nums[i] += nums[i - 2];
        }
        if(i >= 1 && arr[i] - arr[i - 1] <= 3) {
            nums[i] += nums[i - 1];
        }
    }

    cout << nums[size - 1];
    return 0;
}