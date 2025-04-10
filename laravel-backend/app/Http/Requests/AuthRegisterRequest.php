<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // يمكنك هنا تحديد من يمكنه إرسال الطلب، إذا كنت تريد تقييد الوصول
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'type' => 'required|in:company,applicant',
        ];
    }
}
