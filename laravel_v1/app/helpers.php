<?php

    function my_rand_str($length = 32) : string
    {
        // All characters
        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

        // Length of character list
        $chars_length = (strlen($chars) - 1);

        // Start our string
        $string = $chars[rand(0, $chars_length)];

        // Generate random string
        for ($i = 1; $i < $length; $i = strlen($string))
        {
            // Random index
            $rand = rand(0, $chars_length);

            // Grab a random character from our list
            $r = $chars[$rand];

            // Make sure the same two characters don't appear next to each other
            if ($r != $string[$i - 1])
                $string .=  $r;
            else
            {
                $rand += 1;
                // Else select upper char or lower
                $string .= $rand > $chars_length ? $chars[$rand - 2] :$chars[$rand];
            }
        }

        // Return the string
        return $string;
    }

    function my_abort_forbidden_if(bool $truth)
    {
        if ($truth) abort(config('app.response.code.error'));
    }

    function my_success_response(string $message)
    {
        return response($message, config('app.response.code.success'));
    }

    /**
     * Abort error messages if error occurs.
     *
     * @param bool $truth = truth value to check if to abort
     * @param $messages = error messages to abort with
     *
     * @return void
    */
    function my_abort_errors_if(bool $truth, $messages)
    {
        if ($truth) my_abort_errors($messages);
    }

    /**
     * Abort error messages if error occurs.
     *
     * @param array $messages = error messages to abort with
     *
     * @return void
     */
    function my_abort_errors(array $messages)
    {
        abort(468, json_encode($messages));
    }
